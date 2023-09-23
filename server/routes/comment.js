const express = require("express");
const router = express.Router();
const Comment = require("../models/comment.model");

router.post("/", async (req, res) => {
  try {
    const comment = await Comment.create({
      name: req.body.name,
      comment: req.body.comment,
      stars: req.body.stars,
    });

    res.json({ status: "ok", comment: comment });
  } catch (error) {
    res.json({ status: "error", error: error });
  }
});

router.get("/all_comments", async (req, res) => {
  try {
    const comment = await Comment.find({});

    res.json({ status: "ok", comment: comment });
  } catch (error) {
    res.json({ status: "error", error: error });
  }
});

module.exports = router;
