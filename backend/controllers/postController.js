const Post = require("../models/Post");
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const cloudinary = require("cloudinary");

//
const getPost = async (req, res) => {
  const postId = req.query.id;

  try {
    const post = await Post.findById(postId);
    res.status(201).json(post);

    // res.status(201).json(post);
  } catch (error) {
    console.log(error.message);
  }
};

//
const createPost = async (req, res) => {
  const file = req.files.img;
  // upload to cloudinary
  const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
    folder: "avatars",
    width: 500,
    crop: "scale",
    effect: "sharpen",
    // quality: 30,
  });
  const newPost = new Post({
    userId: req.body.userId,
    username: req.body.username,
    restaurantId: req.body.restaurantId,
    restaurantname: req.body.restaurantname,
    city: req.body.city || "",
    foodCategory: JSON.parse(req.body.foodCategory),
    dishType: JSON.parse(req.body.dishType),
    price: req.body.price,
    img: result.secure_url,
  });
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

//
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // if (post.userId === req.body.userId) {
    await post.updateOne({ $set: req.body });
    res.status(200).json("this post has been updated");
    // } else {
    //   res.status(403).json("you can update only your post");
    // }
  } catch (err) {
    res.status(500).json(err);
  }
};

//
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.deleteOne();
    res.status(200).json("the post has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

//
const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const pageSize = req.query.pageSize || 100;
    const search = req.query.search || "";
    const city = req.query.city || "";

    let query = {};

    if (search.length > 0) {
      query.restaurantId = { $regex: search, $options: "i" };
    }
    if (city.length > 0) {
      query.city = { $eq: city };
    }
    if (!Object.keys(query).length) query = {};

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(page * pageSize)
      .limit(pageSize);
    const total = await Post.countDocuments(query);

    const data = {
      error: false,
      total,
      page: page + 1,
      pageSize,
      posts,
    };

    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

//
const getUserPost = async (req, res) => {
  try {
    const currentUser = await Post.findById(req.params.userId).sort({
      createdAt: -1,
    });
    const userPosts = await Post.find({ userId: currentUser._id }).sort({
      createdAt: -1,
    });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return console.log("working!!!");
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json("error: " + err);
  }
};

//
const getUsernamePost = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).sort({
      createdAt: -1,
    });
    const posts = await Post.find({ userId: user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json("no!" + err);
  }
};

//
const getRestaurantPosts = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      restaurantname: req.params.restaurantname,
    });
    const posts = await Post.find({ restaurantId: restaurant._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

//
const likePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id);

    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//
const disLikePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id);

    if (!post.disLikes.includes(req.body.userId)) {
      await post.updateOne({ $push: { disLikes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    } else {
      await post.updateOne({ $pull: { disLikes: req.body.userId } });
      res.status(200).json("The post has been liked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getPost,
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getUserPost,
  getUsernamePost,
  getRestaurantPosts,
  likePost,
  disLikePost,
};
