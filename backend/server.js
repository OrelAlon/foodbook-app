const express = require("express");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;

const app = express();

// connect to mongoose
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, () => {
      console.log("Connected to MongoDB !!");
    });
  } catch (error) {
    throw error;
  }
};

// // middlewares
app.use(express.json());
app.use(cookieParser());

// end-point
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/restaurants", require("./routes/restaurants"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// connect to backend
// process env for Heroku
app.listen(process.env.PORT || 8000, () => {
  connect();
  console.log("Connected to backend !!");
});
