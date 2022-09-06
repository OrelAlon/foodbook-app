const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
  {
    restaurantname: {
      type: String,
      require: true,
      min: 1,
      max: 20,
      unique: true,
    },

    postId: {
      type: String,
    },

    profilePicture: {
      type: String,
      default: "",
    },

    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },

    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", RestaurantSchema);
