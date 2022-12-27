const mongoose = require("mongoose");

// connect to mongoose
const connect = (url) => {
  try {
    mongoose.connect(url, () => {
      console.log("Connected to MongoDB !!");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
