// const express = require("express");
// const router = express.Router();
// const nodemailer = require("nodemailer");

// let transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: true,
//   auth: {
//     user: "mustafanad123@gmail.com",
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// router.post("/", async (req, res) => {
//   const mailOption = {
//     from: `Hotel Haven <mustafanad123@gmail.com>`,
//     to: req.body.email,
//     subject: "",
//     html: ``,
//   };
//   transporter.sendMail(mailOption, (err, info) => {
//     if (err) {
//       res.json({ status: "error", error: err });
//     } else {
//       res.json({ status: "ok", email: "Email Sent" });
//     }
//   });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const pdf = require("pdfkit"); // PDF generation library
const fs = require("fs"); // File system module

// Create a transporter for sending emails
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "mustafanad123@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post("/", async (req, res) => {
  // Generate the PDF
  const doc = new pdf();
  const pdfFilePath = "transcript.pdf";
  doc.pipe(fs.createWriteStream(pdfFilePath));

  // Create the PDF content (header, transcript details, signature, etc.)
  doc.font("Helvetica-Bold").fontSize(24).text("University Transcript", { align: "center" });
  doc.image("path/to/university-logo.png", 100, 100, { width: 200 }); // Replace with your university logo path
  doc.fontSize(12).text("Student Name: John Doe", { align: "left" });
  // Add more transcript details as needed
  doc.text("Signature: ____________________", { align: "right" });

  // Finalize the PDF
  doc.end();

  // Send the email with the PDF attachment
  const mailOptions = {
    from: `University Transcripts <mustafanad123@gmail.com>`,
    to: req.body.email,
    subject: "Your University Transcript",
    text: "Please find your university transcript attached.",
    attachments: [{ filename: "transcript.pdf", path: pdfFilePath }],
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
      res.status(500).json({ status: "error", error: "Failed to send email" });
    } else {
      console.log("Email sent:", info.response);
      res.json({ status: "ok", email: "Email Sent" });
    }

    // Delete the temporary PDF file
    fs.unlink(pdfFilePath, (err) => {
      if (err) {
        console.error("Error deleting PDF file:", err);
      }
    });
  });
});

module.exports = router;