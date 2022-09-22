const router = require("express").Router();
const {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getUserPost,
  likePost,
} = require("../controllers/postController");

router.post("/", createPost);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

router.get("/feed", getAllPosts);

router.get("/timeline/:userId", getUserPost);

router.put("/:id/like", likePost);

module.exports = router;
