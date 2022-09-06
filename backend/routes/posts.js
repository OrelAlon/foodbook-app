const router = require("express").Router();
const { createPost, updatePost } = require("../controllers/postController");

// Create Post
router.post("/", createPost);

// Update Post
router.put("/:id", updatePost);

module.exports = router;
