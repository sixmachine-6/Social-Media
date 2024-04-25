const express = require("express");
const authController = require("./../Controllers/authController");
const postController = require("./../Controllers/postController");

const router = express.Router();

router.route("/").post(authController.loggedIn, postController.createPost);

router
  .route("/:id")
  .get(authController.loggedIn, postController.likePosts)
  .put(authController.loggedIn, postController.updatePost)
  .delete(authController.loggedIn, postController.deletePost)
  .post(authController.loggedIn, postController.addComment);

module.exports = router;
