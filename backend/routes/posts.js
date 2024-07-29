const express = require('express');
const router = express.Router();
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
  addComment,
  fetchComments,
  deleteComment,
} = require('../controllers/postController');

router.get('/', getPost);

router.post('/', createPost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

router.get('/feed', getAllPosts);

router.get('/timeline/:userId', getUserPost);

router.get('/profile/:username', getUsernamePost);

router.get('/restaurants/:restaurantname', getRestaurantPosts);

router.put('/:id/like', likePost);

router.post('/:id/comment', addComment);

router.get('/:id/comments', fetchComments);

router.delete('/:postId/comments/:commentId', deleteComment);

module.exports = router;
