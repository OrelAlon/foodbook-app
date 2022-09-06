const Restaurant = require("../models/Restaurant");

//
//
const createRestaurant = async (req, res) => {
  try {
    const newRestaurant = new Restaurant({
      restaurantname: req.body.restaurantname,
      desc: req.body.desc,
      profilePicture: req.body.profilePicture,
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
