const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.post("/", async (req, res) => {
  const name = req.body.firstName + " " + req.body.lastName;
  try {
    const user = await User.create({
      name: name,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      address: null,
      phoneNumber: null,
      image: null,
      type: "user",
    });

    res.json({ status: "ok", user: user });
  } catch (error) {
    res.json({ status: "error", error: error });
  }
});

module.exports = router;
