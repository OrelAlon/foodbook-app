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

      const file = req.files.profilePicture;

      // upload to cloudinary
      const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: "avatars",
        width: 200,
        crop: "scale",
      });

      user.profilePicture = result.secure_url;

      await user.save();

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


Here is an example of how you could save the updated user to local storage in a React app after making a successful request to the update endpoint:

Copy code
import axios from 'axios';

const updateUser = (userId, updatedUser) => {
  return axios.put(`/users/${userId}`, updatedUser)
    .then(res => {
      // update the user in local storage
      localStorage.setItem('user', JSON.stringify(res.data));
      return res.data;
    });
}
This function makes a PUT request to the update endpoint with the updated user data, and then updates the user in local storage with the updated user data returned by the server.

You can then use this function in your component to update the user and save the updated user to local storage:

Copy code
import { updateUser } from './api';

const MyComponent = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // get the userId and updated user data from the form
    const userId = event.target.userId.value;
    const updatedUser = {
      name: event.target.name.value,
      email: event.target.email.value,
      image: event.target.image.value
    };

    updateUser(userId, updatedUser).then(user => {
      // update the state with the updated user
      setUser(user);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields for updating the user */}
      <button type="submit">Update User</button>
    </form>
  );
}
I hope this helps! Let me know if you have any questions.



