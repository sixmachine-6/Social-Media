const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const { promisify } = require("util");

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return next(new AppError("please provide the password", 401));
    }
    const checkOldPassword = await user.checkPassword(
      oldPassword,
      user.password
    );
    if (!checkOldPassword) {
      return next(new AppError("Your current password is wrong.", 401));
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({
      status: "success",
      message: "Password Updated",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.myProfile = async (req, res) => {
  const user = await User.findById(req.user._id).populate("posts");
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.params.id).populate("posts");

  if (!user) {
    res.status(500).json({
      status: "fail",
      message: "user not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};
