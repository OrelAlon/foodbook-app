require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
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

// file-upload - create a path to img folder
app.use("/upload", express.static(path.join(__dirname, "/public/upload")));

app.use(fileupload({ useTempFiles: true }));

// file-upload - upload files
app.post("/api/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "no file!" });
  }

  const file = req.files.file;
  file.mv(`${__dirname}/public/upload/${file.name}`, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });
  res.json({ fileName: file.name, filePath: `/public/upload/${file.name}` });
});

// // middlewares
app.use(
  cors({
    origin: ["http://localhost:3000", "https://foodbook.onrender.com/"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// end-point
app.use("/api", require("./routes/index"));

// Serve frontend for aws
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
// process env for aws
app.listen(process.env.PORT || 5500, () => {
  connect(process.env.MONGO_URL);
  console.log(`Server running on port ${process.env.PORT || 5500}`);
});
