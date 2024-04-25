const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  description: {
    type: String,
    maxlength: 40,
  },
  image: {
    id: String,
    url: String,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
