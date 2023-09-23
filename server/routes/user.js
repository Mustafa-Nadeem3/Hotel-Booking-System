const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const User = require("../models/user.model");

router.get("/", async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decode = jwt.verify(token, "secret123");
    const id = decode.id;
    const user = await User.findById({
      _id: id,
    });
    res.json({ status: "ok", user: user });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

router.get("/all_users", async (req, res) => {
  try {
    const users = await User.find({});

    res.json({ status: "ok", users: users });
  } catch (error) {
    console.error("User error:", error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../server/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/profile", upload.single("image"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  try {
    const token = req.headers["x-access-token"];
    const decode = jwt.verify(token, "secret123");
    const id = decode.id;
    const user = await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          gender: req.body.gender,
          address: req.body.address,
          phoneNumber: req.body.phoneNumber,
          image: req.file.filename,
          type: "user",
        },
      },
      { new: true }
    );
    res.json({ status: "ok", user: user });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

router.delete("/", async (req, res) => {
  try {
    await User.findByIdAndDelete({ _id: req.body.userID });

    res.json({ status: "ok" });
  } catch (error) {
    console.error("User Delete error:", error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

module.exports = router;
