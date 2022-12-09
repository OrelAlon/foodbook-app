import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import moment from "moment";
import axios from "axios";
import heart from "../../assets/heart.png";

import "./post.css";

const UserPost = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [restaurant, setRestaurant] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/?userId=${post.userId}`);
      setUser(res.data);
    };
    const fetchRestaurant = async () => {
      const res = await axios.get(
        `/api/restaurants/?restaurantId=${post.restaurantId}`
      );
      setRestaurant(res.data);
    };
    fetchRestaurant();
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

  const deleteHandler = async () => {
    try {
      await axios.delete(`/api/posts/${post._id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <img className='postProfileImg' src={user.profilePicture} alt='' />
            <span className='postUsername'>
              <span className='bold'> {user.username} </span>in{" "}
              <span className='bold'>{restaurant.restaurantname}</span>
            </span>
            <p>Posted {moment(post.updatedAt).fromNow()}</p>
          </div>
          {post.userId === currentUser._id && (
            <div className='postTopRight delete' onClick={deleteHandler}>
              X{" "}
            </div>
          )}
        </div>
        <div className='postCenter'>
          <img className='postImg' src={post.img} alt='' />
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
            <span className='postText'>{post.desc}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPost;
