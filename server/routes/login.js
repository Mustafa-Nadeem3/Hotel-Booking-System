const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.username,
    });

    if (!user) {
      res.status(404).json({ status: "error", message: "User not found" });
    } else if (user.password === req.body.password) {
      const userID = user._id.toString();
      const token = jwt.sign(
        {
          id: userID,
        },
        "secret123"
      );
      res.json({ status: "ok", user: true, token: token, type: user.type });
    } else {
      res.json({ status: "ok", user: false });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

module.exports = router;
