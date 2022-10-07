import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import moment from "moment";
import axios from "axios";
import heart from "../../assets/heart.png";

import "./post.css";

const RestaurantPost = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/?userId=${post.userId}`);
      setUser(res.data);
    };

    fetchUser();
  }, [post]);

  const likeHandler = () => {
    try {
      axios.put(`/api/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <img
              className='postProfileImg'
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "noAvatar.png"
              }
              alt=''
            />
            <span className='postUsername'> {user.username} </span>
            <p>Posted {moment(post.updatedAt).fromNow()}</p>
          </div>
        </div>
        <div className='postCenter'>
          <img className='postImg' src={PF + post.img} alt='' />
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <img
              className='likeIcon'
              src={heart}
              onClick={likeHandler}
              alt=''
            />
            <span className='postLikeCounter'>{like} people like it</span>
          </div>
          <div className='postBottomRight'>
            {" "}
            <span className='postText'>{post.desc}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPost;
