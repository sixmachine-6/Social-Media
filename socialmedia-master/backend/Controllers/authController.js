const User = require("./../models/userModel");
const AppError = require("./../utils/error");
const jwt = require("jsonwebtoken");
const Email = require("./../utils/email");
const crypto = require("crypto");
function sendToken(user, statusCode, res) {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(statusCode).cookie("jwt", token, cookieOptions).json({
    status: "success",
    data: {
      user,
      token,
    },
  });
}

exports.signup = async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    sendToken(user, 201, res);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password!", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user || !(await user.checkPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }
    sendToken(user, 200, res);
  } catch (err) {
    console.log(err.message);
  }
};

exports.loggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log(token);
    if (!req.cookies.jwt) console.log("aman");
    // console.log(req.cookies.jwt);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);

    const user = await User.findById({ _id: decoded.id });
    console.log(user);
    if (!user) return next();

    req.user = user;
    next();
  } catch (err) {
    console.log(err.message);
  }
};

exports.logout = async (req, res) => {
  try {
    res.status(200).cookie("jwt", "loggedout").json({
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    console.log("aman");
    await Email({
      email: user.email,
      subject: "Your password reset token",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
};

exports.resetPassword = async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
  });

  if (!user) {
    return next(new AppError("Token is invalid", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;

  await user.save();

  sendToken(user, 200, res);
};
