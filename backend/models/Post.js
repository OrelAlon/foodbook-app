const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    restaurantId: {
      type: String,
      required: true,
    },
    restaurantname: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      max: 50,
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
    comments: {
      type: [
        {
          text: String,
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
