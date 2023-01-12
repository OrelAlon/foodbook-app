const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    usernamepost: {
      type: String,
    },
    restaurantId: {
      type: String,
      required: true,
    },
    restaurantnamepost: {
      type: String,
    },
    foodCategory: {
      type: Array,
      default: [],
    },
    dishType: {
      type: Array,
      default: [],
    },
    desc: {
      type: String,
      max: 500,
    },
    price: {
      type: Number,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
