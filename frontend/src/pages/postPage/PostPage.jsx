import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import {
  fetchPostId,
  addCommentToPost,
  fetchCommentsByPostId,
  deleteCommentFromPost,
} from '../../api/ApiFetch';
import { Image } from '@mantine/core';
import LikePost from '../../components/likePost/LikePost';
import TimePost from '../../components/timePost/TimePost';
import Loading from '../../components/loading/Loading';
import GoBackButton from '../../components/goBackButton/GoBackButton';
import '../../App.scss';

const PostPage = () => {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const { id: postId } = useParams();

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const res = await fetchPostId(postId);
      setPost(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetchCommentsByPostId(postId);
      setComments(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [postId]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = async () => {
    if (!comment.trim()) {
      alert('Comment cannot be empty');
      return;
    }

    try {
      const res = await addCommentToPost(postId, { text: comment });
      setComments([...comments, res]);
      setComment('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteCommentFromPost(postId, commentId);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCommentsVisibility = () => {
    setCommentsVisible(!commentsVisible);
  };

  return (
    <>
      {isLoading ? (
        <div className='center-div'>
          <Loading />
        </div>
      ) : (
        <div className='pop-up-container'>
          <div className='post-page-container'>
            <div className='post-page-header'>
              <div className='go-back'>
                <GoBackButton />
              </div>
              <div className='restaurant-info'>
                <Link to={`/profile/${post.username}`} className='linkwithout'>
                  <span className='bold'>{post.username}</span>
                </Link>
                {' at '}
                <Link
                  className='linkwithout'
                  to={`/restaurant/${post.restaurantname}`}
                >
                  <span className='bold'>{post.restaurantname}</span>
                </Link>
              </div>
            </div>
            <div className='image-container'>
              <Image
                radius='md'
                src={post.img}
                alt={post.img}
                w='auto'
                height={'50vh'}
                fit='contain'
              />
            </div>
            <div className='comment-container'>
              <input
                type='text'
                placeholder='Add a comment...'
                value={comment}
                onChange={handleCommentChange}
                className='comment-input'
              />
              <button onClick={handleAddComment} className='add-comment-btn'>
                Add
              </button>
            </div>
            <div className='bottom-container'>
              <div className='left'>
                <LikePost id={post?._id} likes={post?.likes} />
              </div>
              <div className='right'>
                <TimePost createdAt={post.createdAt} />
              </div>
            </div>
            <div className='comments-wrapper'>
              <button onClick={toggleCommentsVisibility}>
                {commentsVisible ? 'Hide Comments △' : 'Show Comments ▼'}
              </button>
              {commentsVisible && (
                <div className='comments'>
                  {comments.map((comment, index) => (
                    <div key={index} className='comment'>
                      {comment.text}
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className='delete-comment-btn'
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostPage;
