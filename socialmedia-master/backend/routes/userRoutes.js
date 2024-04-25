const express = require("express");
const userController = require("./../Controllers/userController");
const authController = require("./../Controllers/authController");
const router = express.Router();

router.route("/login").post(authController.login);
router.route("/signup").post(authController.signup);
router.route("/logout").get(authController.logout);
router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/resetPassword/:token").post(authController.resetPassword);

router
  .route("/updatePassword")
  .post(authController.loggedIn, userController.updatePassword);

router
  .route("/myprofile")
  .get(authController.loggedIn, userController.myProfile);
router
  .route("/user/:id")
  .get(authController.loggedIn, userController.getUserProfile);

module.exports = router;
