require("dotenv").config();
const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const connect = require("./config/db");

const app = express();

// Setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(fileupload({ useTempFiles: true }));

// // middlewares
app.use(
  cors({
    origin: ["http://localhost:3000", "https://foodbook.onrender.com/"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// end-point
app.use("/api", require("./routes/index"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

// connect to backend
// process env
app.listen(process.env.PORT || 5500, () => {
  connect(process.env.MONGO_URL);
  console.log(`Server running on port ${process.env.PORT || 5500}`);
});
