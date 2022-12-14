const Restaurant = require("../models/Restaurant");
const cloudinary = require("cloudinary");

//
//
const createRestaurant = async (req, res) => {
  try {
    const file = req.files.profilePicture;
    // upload to cloudinary
    const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "avatars",
      width: 500,
      crop: "scale",
      effect: "sharpen",
    });

    const newRestaurant = new Restaurant({
      restaurantname: req.body.restaurantname,
      city: req.body.city,
      foodCategory: req.body.foodCategory,
      profilePicture: result.secure_url,
    });

    const savedRestaurant = await newRestaurant.save();
    res.status(200).json(savedRestaurant);
  } catch (error) {
    res.status(500).json(error);
  }
};

//
const getRestaurant = async (req, res) => {
  const restaurantId = req.query.restaurantId;
  const restaurantname = req.query.restaurantname;

  try {
    const restaurant = restaurantId
      ? await Restaurant.findById(restaurantId)
      : await Restaurant.findOne({ restaurantname: restaurantname });
    if (restaurant == null) {
      res.status(404).json("no data");
      return;
    }
    res.status(200).json(restaurant);
  } catch (err) {
    res.status(500).json("error:" + err);
  }
};

//
const getAllRestaurants = async (req, res) => {
  try {
    const data = await Restaurant.find();
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createRestaurant,
  getRestaurant,
  getAllRestaurants,
};
