const User = require("../models/User");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");

//
const register = async (req, res) => {
  try {
    const file = req.files.profilePicture;

    // upload to cloudinary
    const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    // bcrypt for new password
    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      profilePicture: result.secure_url,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(501).json(err);
  }
};

//
const login = async (req, res) => {
  try {
    // find user
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json("user not found");
      return;
    }

    // !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).json("wrong password");
      return;
    }
    // !validPassword && res.status(400).json("wrong password");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { register, login };
