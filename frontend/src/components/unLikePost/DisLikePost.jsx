import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import axios from "axios";

const DisLikePost = ({ id, disLikes }) => {
  const [disLike, setDisLike] = useState(disLikes.length);
  const [loading, setLoading] = useState(false);

  const { user: currentUser } = useContext(AuthContext);

  const [isDisLiked, setIsDisLiked] = useState();
  const checkIfDisLike = disLikes.includes(currentUser._id);

  useEffect(() => {
    setIsDisLiked(checkIfDisLike);
  }, []);

  const likeHandler = async () => {
    setLoading(true);

    try {
      const response = await axios.put(`/api/posts/${id}/dislike`, {
        userId: currentUser._id,
      });
      if (!isDisLiked) {
        setDisLike((prevLike) => prevLike + 1);

        setIsDisLiked(true);
      } else if (isDisLiked) {
        setDisLike((prevLike) => prevLike - 1);
        setIsDisLiked(false);
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
            className={
              "postLikeCounter " + (isDisLiked ? "" : "grayscaleText ")
            }
          >
            🤢 {disLike} want to remove it...
          </span>
        )}
      </div>
    </>
  );
};

export default DisLikePost;
