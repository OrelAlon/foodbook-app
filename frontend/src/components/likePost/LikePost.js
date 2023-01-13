import React from "react";

const LikePost = ({ likeHandler, like, loading }) => {
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
