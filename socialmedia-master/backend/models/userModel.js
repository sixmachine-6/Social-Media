const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "please tell us your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please enter the password"],
    minlength: [8, "password must be atleast 8 characters long"],
    select: false,
  },
  confirmPassword: {
    type: String,
    // required: [true, "please enter the password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "your password is not same",
    },
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],

  passwordResetToken: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.checkPassword = async function (password, userPassword) {
  return await bcrypt.compare(password, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
