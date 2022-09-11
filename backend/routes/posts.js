const router = require("express").Router();
const {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
} = require("../controllers/postController");

router.post("/", createPost);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

router.get("/feed", getAllPosts);

module.exports = router;
