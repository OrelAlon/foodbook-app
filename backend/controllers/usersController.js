const User = require("../models/User");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");

//
const getUser = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId
      ? await User.findById(userId) //.exec()
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json("error:" + err);
  }
};

//
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json("error:" + err);
  }
};

//
const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findById({ _id: req.params.id });
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.instagram = req.body.instagram || user.instagram;
      user.profilePicture = user.profilePicture;

      // Checking if the user has updated the image
      if (req.files && req.files.profilePicture) {
        const file = req.files.profilePicture;
        // upload to cloudinary
        const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
          folder: "avatars",
          width: 200,
          crop: "scale",
          effect: "sharpen",
        });
        user.profilePicture = result.secure_url;
      }

      user.save();

      res.status(200).json("User has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
};

//
const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
};

module.exports = { getUser, getAllUsers, updateUser, deleteUser };
