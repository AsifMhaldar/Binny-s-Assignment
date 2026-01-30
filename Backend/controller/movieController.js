const Movie = require("../models/Movie");


exports.getAllMovies = async (req, res) => {
  try {
    const sortBy = req.query.sortBy || "name";

    let sortOption = {};

    if (sortBy === "name") sortOption = { title: 1 };
    if (sortBy === "rating") sortOption = { rating: -1 };
    if (sortBy === "releaseDate") sortOption = { releaseDate: -1 };
    if (sortBy === "duration") sortOption = { duration: 1 };

    const movies = await Movie.find().sort(sortOption);

    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getSortedMovies = async (req, res) => {
  try {
    const { by } = req.query;
    let sortOption = {};

    if (by === "name") sortOption = { title: 1 };
    if (by === "rating") sortOption = { rating: -1 };
    if (by === "releaseDate") sortOption = { releaseDate: -1 };
    if (by === "duration") sortOption = { duration: 1 };

    const movies = await Movie.find().sort(sortOption);
    res.json(movies);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.searchMovies = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) return res.json([]);

    const movies = await Movie.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } }
      ]
    });

    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.addMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
