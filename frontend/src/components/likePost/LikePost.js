import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import axios from "axios";

const LikePost = ({ id, likes }) => {
  const [like, setLike] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user: currentUser } = useContext(AuthContext);

  const likeHandler = async () => {
    setLoading(true);

    try {
      const response = await axios.put(`/api/posts/${id}/like`, {
        userId: currentUser._id,
      });
      if (response.data === "The post has been liked") {
        setLike((prevLike) => prevLike + 1);

        setIsLiked(true);
      } else if (response.data === "The post has been disliked") {
        setLike((prevLike) => prevLike - 1);
        setIsLiked(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='postBottomLeft cursor transform' onClick={likeHandler}>
        {loading ? (
          <span className='loading-emoji'>🤤</span>
        ) : (
          <span className='postLikeCounter'>🤤 {like} want it...</span>
        )}
      </div>
    </>
  );
};

export default LikePost;
