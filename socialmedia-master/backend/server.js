const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./backend/config/config.env" });
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
mongoose
  .connect(process.env.DB_STRING)
  .then(() => console.log("connection successful"))
  .catch(() => console.log("error while connecting"));

app.listen(process.env.PORT, () =>
  console.log(`server is running at the ${process.env.PORT}`)
);

// cloudinary.config({
//   cloud_name: "dwmqlb5tc",
//   api_key: "387993179396986",
//   api_secret: "AsVYDuJxn5B92Y_lGocffPYFeF0",
// });
