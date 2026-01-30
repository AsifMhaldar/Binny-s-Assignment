const express = require("express");
const {
  getAllMovies,
  searchMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
  getSortedMovies
} = require("../controller/movieController");

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/search", searchMovies);
router.get("/sorted", getSortedMovies);
router.get("/:id", getMovieById);
router.get("/", getAllMovies);

router.post("/", verifyToken, isAdmin, addMovie);
router.put("/:id", verifyToken, isAdmin, updateMovie);
router.delete("/:id", verifyToken, isAdmin, deleteMovie);

module.exports = router;
