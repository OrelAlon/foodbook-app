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

//
const updatePassword = async (req, res) => {
  try {
    const { newPassword, userId } = req.body;
    // Find the user in the database

    const user = await User.findById({ _id: userId });
    // Hash the new password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    // Update the user's password in the database
    await User.updateOne({ _id: userId }, { password: hashedPassword });
    res.send({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error updating password" });
  }
};

//
const followUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id);
    if (!user.followers.includes(req.body.userId)) {
      await user.updateOne({ $push: { followers: req.body.userId } });
      res.status(200).json("The user has been follow");
    } else {
      await user.updateOne({ $pull: { followers: req.body.userId } });
      res.status(200).json("The user has been unfollow");
    }
  } catch (error) {
    res.status(500).json(err);
  }
};

module.exports = {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  updatePassword,
  followUser,
};
