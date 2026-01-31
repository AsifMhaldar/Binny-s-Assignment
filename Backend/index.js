const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const movieRoutes = require("./routes/movieRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);


// let isConnected = false;
// async function connectToMongoDB(){
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     isConnected = true;
//     console.log("MongoDB Connected");
//   } catch (error) {
//     console.log("MongoDB connection error:", error);
//   }
// }

// app.use(async (req, res, next) => {
//   if (!isConnected) {
//     await connectToMongoDB();
//   }
//   next();
// }
// );

// module.exports = app;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
