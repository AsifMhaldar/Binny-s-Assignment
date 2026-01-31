const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const movieRoutes = require("./routes/movieRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();


app.use(express.json());
app.use(cors({
  origin: "https://menmovieapp.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
