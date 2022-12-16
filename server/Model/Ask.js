const mongoose = require("mongoose");

const askSchema = new mongoose.Schema({
  title: String,
  content: String,
  postNum: Number,
  image: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  repleNum: {
    type: Number,
    default: 0,
  },
}, { collection : "asks", timestamps: true});

const Ask = mongoose.model("Ask", askSchema);

module.exports = { Ask };