const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true 
  },
  description: {
    type: String 
  },
  rating: {
    type: Number 
  },
  releaseDate: {
    type: Date 
  },
  duration: {
    type: String,
    required: true
  },
  poster: {
    type: String 
  },
  releaseDate: Date
  
}, { timestamps: true });

module.exports = mongoose.model("Movie", movieSchema);
