const router = require("express").Router();
const {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  likePost,
} = require("../controllers/postController");

router.post("/", createPost);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

router.get("/feed", getAllPosts);

router.put("/:id/like", likePost);

module.exports = router;
