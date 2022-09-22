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

//
const getAllPosts = async (req, res) => {
  try {
    const data = await Post.find();
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};
//
const getUserPost = async (req, res) => {
  try {
    const currentUser = await Post.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return console.log("working!!!");
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json("not workingggg");
  }
};

//
const getUsernamePost = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
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

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getUserPost,
  getUsernamePost,
  likePost,
};
