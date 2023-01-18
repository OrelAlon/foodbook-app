const router = require("express").Router();
const {
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
} = require("../controllers/postController");

router.get("/", getPost);

router.post("/", createPost);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

router.get("/feed", getAllPosts);

router.get("/timeline/:userId", getUserPost);

router.get("/profile/:username", getUsernamePost);

router.get("/restaurants/:restaurantname", getRestaurantPosts);

router.put("/:id/like", likePost);

router.put("/:id/dislike", disLikePost);

module.exports = router;
