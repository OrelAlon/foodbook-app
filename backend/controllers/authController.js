const User = require("../models/User");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
const { OAuth2Client } = require("google-auth-library");
var crypto = require("crypto");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//
const register = async (req, res) => {
  try {
    const file = req.files.profilePicture;

    // upload to cloudinary
    const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "avatars",
      width: 200,
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

const googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body;
    const id = crypto.randomBytes(4).toString("hex");
    const { payload } = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, email_verified, name } = payload;
    if (email_verified) {
      const user = await User.findOne({ email });
      console.log(user);
      if (user) {
        res.status(200).json(user);
      }
      if (!user) {
        const hashedPassword = await bcrypt.hash(id, 10);
        const logUser = await User.create({
          username: name,
          password: hashedPassword,
          email,
        });
        res.status(200).json(logUser);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { register, login, googleLogin };
