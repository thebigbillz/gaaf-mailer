const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const mailer = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendEmail = async (req, res) => {
  const { fullName, email, company, phone, content } = req.body;

  const options = {
    from: process.env.SEND_FROM,
    to: process.env.SEND_TO,
    subject: "New Think Tank Contact",
    html: `<div>
                <h3>Think Tank Contact</h3>
                <p><span style="font-weight:bold">Name: </span>${
                  fullName || "-"
                }</p>
                <p><span style="font-weight:bold">Email: </span>${
                  email || "-"
                }</p>
                <p><span style="font-weight:bold">Company: </span>${
                  company || "-"
                }</p>
                <p><span style="font-weight:bold">Phone Number: </span>${
                  phone || "-"
                }</p>
                <p><span style="font-weight:bold">Message: </span>${
                  content || "-"
                }</p>
                </div>
            `,
  };
  try {
    await mailer.sendMail(options);
    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};
