const mongoose = require("mongoose");

const Comment = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    stars: { type: String, required: true },
  },
  { collection: "comment-data" }
);

const model = mongoose.model("CommentData", Comment);

module.exports = model;
