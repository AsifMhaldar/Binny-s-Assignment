const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const movieRoutes = require("./routes/movieRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

/* ✅ CORS */
app.use(cors({
  origin: "https://binny-s-assignment-sb23.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());
app.use(express.json());

/* ✅ MongoDB connection (before routes) */
let isConnected = false;

async function connectToMongoDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

// connect before every request
app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectToMongoDB();
  }
  next();
});

/* ✅ Routes AFTER DB connection */
app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);

/* Health check */
app.get("/", (req, res) => {
  res.send("Backend is running");
});

module.exports = app;


// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
