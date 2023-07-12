const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    userFrom: {
      type: String,
      ref: "User",
    },
    cafePostId: Number,
    name: String,
    address: String,
    image: String,
  },
  { collection: "favorites" }
);

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = { Favorite };
