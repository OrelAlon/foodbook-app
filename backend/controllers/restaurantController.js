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
      price: req.body.price,
      instgram: req.body.instgram,
      foodCategory: JSON.parse(req.body.foodCategory),
      profilePicture: result.secure_url,
      desc: req.body.desc,
    });

    const savedRestaurant = await newRestaurant.save();
    res.status(200).json(savedRestaurant);
  } catch (error) {
    res.status(500).json(error);
  }
};

//
const createTempRestaurant = async (req, res) => {
  try {
    const newTempRestaurant = new Restaurant({
      restaurantname: req.body.query,
    });
    const savedTempRestaurant = newTempRestaurant.save();
    res.status(200).json(savedTempRestaurant);
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

//
const followRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id);
    if (!restaurant.followers.includes(req.body.userId)) {
      await restaurant.updateOne({ $push: { followers: req.body.userId } });
      res.status(200).json("The restaurant has been follow");
    } else {
      await restaurant.updateOne({ $pull: { followers: req.body.userId } });
      res.status(200).json("The restaurant has been unfollow");
    }
  } catch (error) {
    res.status(500).json(err);
  }
};

//
const updateRestaurant = async (req, res) => {
  console.log(req.body.restaurantId);
  console.log(req.params.id);
  if (req.body.restaurantId === req.params.id) {
    try {
      const restaurant = await Restaurant.findById({ _id: req.params.id });
      console.log(restaurant);
      restaurant.restaurantname =
        req.body.restaurantname || restaurant.restaurantname;
      restaurant.instagram = req.body.instagram || restaurant.instagram;
      restaurant.profilePicture = restaurant.profilePicture;

      // Checking if the restaurant has updated the image
      if (req.files && req.files.profilePicture) {
        const file = req.files.profilePicture;
        // upload to cloudinary
        const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
          folder: "avatars",
          width: 200,
          crop: "scale",
          effect: "sharpen",
        });
        restaurant.profilePicture = result.secure_url;
      }

      restaurant.save();

      res.status(200).json("Restaurant has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("ERROR!");
  }
};

//
const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    await restaurant.deleteOne();
    res.status(200).json("the restaurant has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createRestaurant,
  getRestaurant,
  getAllRestaurants,
  createTempRestaurant,
  followRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
