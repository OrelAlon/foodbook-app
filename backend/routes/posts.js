const router = require("express").Router();
const {
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.post("/", createPost);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

module.exports = router;
