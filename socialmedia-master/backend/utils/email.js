const nodemailer = require("nodemailer");
const mail = async (options) => {
  console.log(options);
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "dfff3ae2abbd6a",
      pass: "e19b79bd99d9a5",
    },
  });

  const mailOptions = {
    from: "amanshaw2384@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  console.log("aman");
  await transporter.sendMail(mailOptions);
};

module.exports = mail;
