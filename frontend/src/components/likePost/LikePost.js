import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import axios from "axios";

const LikePost = ({ id, likes }) => {
  const [like, setLike] = useState(likes.length);
  const [loading, setLoading] = useState(false);

  const { user: currentUser } = useContext(AuthContext);

  const [isLiked, setIsLiked] = useState();
  const checkIfLike = likes.includes(currentUser._id);

  useEffect(() => {
    setIsLiked(checkIfLike);
  }, []);

  const likeHandler = async () => {
    setLoading(true);

    try {
      await axios.put(`/api/posts/${id}/like`, {
        userId: currentUser._id,
      });
      if (!isLiked) {
        setLike((prevLike) => prevLike + 1);

        setIsLiked(true);
      } else if (isLiked) {
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
          <span className='postLikeCounter loading-emoji'>🤤</span>
        ) : (
          <span
            className={"postLikeCounter " + (isLiked ? "" : "grayscaleText ")}
          >
            🤤 {like} want it...
          </span>
        )}
      </div>
    </>
  );
};

export default LikePost;
