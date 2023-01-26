const mongoose = require("mongoose");
const Post = require("./Post");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 2,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    stars: {
      type: Array,
      default: [],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    instagram: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
UserSchema.pre("remove", async function (next) {
  // Delete all the posts associated with this user
  await Post.deleteMany({ userId: this._id });
  next();
});
module.exports = mongoose.model("User", UserSchema);
