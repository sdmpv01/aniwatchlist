const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // 🔥 IMPORTANT

  title: String,
  type: String,
  status: String,
  rating: Number,
  favorite: Boolean,
  runtime: Number,
  poster: String,
  year: String,
  imdbID: String,
  completedAt: String
});

module.exports = mongoose.model("Movie", movieSchema);