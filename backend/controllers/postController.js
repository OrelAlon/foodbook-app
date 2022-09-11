const Post = require("../models/Post");

//
const createPost = async (req, res) => {
  const newPost = new Post({
    userId: req.body.userId,
    restaurantId: req.body.restaurantId,
    desc: req.body.desc,
    img: req.body.img,
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
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("this post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
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

// get all posts
const getAllPosts = async (req, res) => {
  try {
    const data = await Post.find();
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
};
