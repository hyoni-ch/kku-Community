const mongoose = require("mongoose");

const picSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    postNum: Number,
    image: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { collection: "pics", timestamps: true }
);

const Pic = mongoose.model("Pic", picSchema);

module.exports = { Pic };
