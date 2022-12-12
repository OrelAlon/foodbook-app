const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    restaurantId: {
      type: String,
      required: true,
    },
    foodCategory: {
      type: String,
      max: 50,
    },
    dishType: {
      type: String,
      max: 50,
    },
    desc: {
      type: String,
      max: 500,
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
