import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import moment from "moment";
import axios from "axios";

import heart from "../../assets/heart.png";
// import { Restaurants } from "../../dummyData";

import "./post.css";

const Post = ({ post }) => {
  const [user, setUser] = useState({});
  const [restaurant, setRestaurant] = useState({});
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  const { user: currentUser } = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

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
  }, [post.userId, post.restaurantId]);

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
            <Link to={`/profile/${user.username}`}>
              <img
                className='postProfileImg'
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "noAvatar.png"
                }
                alt=''
              />
            </Link>
            <span className='postUsername'>
              <span className='bold'> {user.username} </span>in{" "}
              <span className='bold'>{restaurant.restaurantname}</span>
            </span>{" "}
          </div>

          {/* <h6 className='postDate'>{format(post.createdAt)}</h6> */}
          <p>Posted {moment(post.updatedAt).fromNow()}</p>
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
            <h3 className='postText'>{post.desc}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
