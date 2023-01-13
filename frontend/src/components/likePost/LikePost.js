import React from "react";

const LikePost = ({ likeHandler, like }) => {
  return (
    <>
      <div className='postBottomLeft cursor transform' onClick={likeHandler}>
        <span className='postLikeCounter'>🤤 {like} want it...</span>
      </div>
    </>
  );
};

export default LikePost;
