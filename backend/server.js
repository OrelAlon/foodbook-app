const express = require("express");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");
const cors = require("cors");

const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const path = require("path");

const port = process.env.PORT || 5500;

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

// file-upload - create a path to img folder
app.use("/upload", express.static(path.join(__dirname, "/public/upload")));

app.use(fileupload());

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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// end-point
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/restaurants", require("./routes/restaurants"));

// Serve frontend for heroku
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, "../", "frontend", "build", "index.html")
//     )
//   );
// } else {
//   app.get("/", (req, res) => res.send("Please set to production"));
// }

// connect to backend
// process env for Heroku
app.listen(process.env.PORT || 5500, () => {
  connect();
  console.log(`Server running on port ${port}`);
});
