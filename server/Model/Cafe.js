const mongoose = require("mongoose");

const cafeSchema = new mongoose.Schema({
  name: String,
  address: String,
  time: String,
  phone: String,
  other: String,
  cafePostNum: Number,
  image: String,
  commentNum: {
    type: Number,
    default: 0,
  },
  heartNum: {
    type: Number,
    default: 0,
  },
}, { collection : "cafes"});

const Cafe = mongoose.model("Cafe", cafeSchema);

module.exports = { Cafe };