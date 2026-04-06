const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const jwt = require("jsonwebtoken");

// 🔐 Middleware to get user
const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};

// ➕ ADD MOVIE
router.post("/", auth, async (req, res) => {
  try {
    const movie = new Movie({
      ...req.body,
      userId: req.user
    });

    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).send("Error saving movie");
  }
});

// 📥 GET MOVIES
router.get("/", auth, async (req, res) => {
  try {
    const movies = await Movie.find({ userId: req.user });
    res.json(movies);
  } catch {
    res.status(500).send("Error fetching movies");
  }
});

// ❌ DELETE
router.delete("/:id", auth, async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

// ✏️ UPDATE MOVIE
router.put("/:id", auth, async (req, res) => {
  console.log("UPDATE HIT:", req.params.id, req.body);
  try {
    const updated = await Movie.findByIdAndUpdate(
  req.params.id,
  { $set: req.body },
  { new: true }
);

console.log("UPDATED DOC:", updated);

    res.json(updated);
  } catch (err) {
    res.status(500).send("Error updating movie");
  }
});

module.exports = router;