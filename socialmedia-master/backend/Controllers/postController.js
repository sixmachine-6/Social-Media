const Post = require("./../models/postModel");
const User = require("./../models/userModel");
const AppError = require("./../utils/error");
const cloudinary = require("cloudinary");
function sendResponse(statusCode, message, status, res) {
  res.status(statusCode).json({
    status: status,
    data: message,
  });
}
exports.createPost = async (req, res) => {
  try {
    // const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    //   folder: "posts",
    // });
    console.log("aman");
    console.log(req.user._id);
    const post = await Post.create({
      description: req.body.description,
      image: {
        id: "myCloud.public_id",
        url: "myCloud.secure_url",
      },
      owner: req.user._id,
    });

    const user = await User.findById(req.user._id);

    user.posts.unshift(post._id);
    await user.save();
    console.log("amanshaw");
    res.status(201).json({
      status: "success",
      data: "post created",
    });
  } catch (err) {
    console.log("aman1");
    sendResponse(500, err, "fail", res);
  }
};

exports.likePosts = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return next(new Error("post not found"));

    if (post.likes.includes(req.user.id)) {
      const index = post.likes.indexOf(req.user._id);

      post.likes.splice(index, 1);

      await post.save();
      res.status(200).json({
        status: "success",
        message: "Post Unliked!",
      });
    } else {
      post.likes.push(req.user.id);

      await post.save();
      res.status(200).json({
        status: "success",
        message: "Post Liked!",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    if (!post) return next(new Error("post not found"));

    if (post.owner.toString() !== req.user._id.toString()) {
      return next(new Error("authorized action"));
    }
    await Post.deleteOne({ _id: id });

    //removing post from user id
    const user = await User.findById(req.user._id);
    const index = user.posts.indexOf(id);
    user.posts.splice(index, 1);
    await user.save();
    res.status(200).json({
      status: "success",
      message: "Post Deleted!",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return next(new Error("post not found"));

    if (post.owner.toString() !== req.user._id.toString()) {
      return next(new Error("authorized action"));
    }
    console.log("aman");

    post.description = req.body.description;
    await post.save();

    res.status(200).json({
      status: "success",
      message: "Post Updated!",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return next(new Error("post not found"));

    post.comments.push({ user: req.user._id, comment: req.body.comment });

    await post.save();

    res.status(201).json({
      status: "success",
      message: "Comment Added!",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// exports.updateComment = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) return next(new Error("post not found"));

//     if (post.owner.toString() !== req.user._id.toString()) {
//       return next(new Error("authorized action"));
//     }

//     post.description = req.body.description;
//     await post.save();

//     res.status(200).json({
//       status: "success",
//       message: "Post Updated!",
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };
