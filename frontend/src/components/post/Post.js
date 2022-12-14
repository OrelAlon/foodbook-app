import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { AiOutlineLike } from "react-icons/ai";
import noAvatar from "../../assets/noAvatar.png";
import moment from "moment";
import axios from "axios";

import "./post.css";

const Post = ({ post }) => {
  const [user, setUser] = useState({});
  const [restaurant, setRestaurant] = useState({});
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  const { user: currentUser } = useContext(AuthContext);

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
                src={user.profilePicture ? user.profilePicture : noAvatar}
                alt=''
              />
            </Link>
            <span className='postUsername'>
              <Link to={`/profile/${user.username}`} className='linkwithout'>
                <span className='bold '> {user.username} </span>
              </Link>
              in{" "}
              <Link
                className='linkwithout'
                to={`/restaurant/${restaurant.restaurantname}`}
              >
                <span className='restaurantname bold'>
                  {restaurant.restaurantname}
                </span>
              </Link>
            </span>{" "}
          </div>

          <p className='posttime'>{moment(post.updatedAt).fromNow()}</p>
        </div>

        <div className='postCenter'>
          <img
            className='postImg'
            src={post.img}
            alt=''
            width='200'
            height='100'
          />
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <AiOutlineLike
              fontSize={18}
              className='likeIcon'
              onClick={likeHandler}
              color={"blue"}
            />
            <span className='postLikeCounter'>{like} people like it</span>
          </div>
          <div className='postBottomRight'>
            {" "}
            <ul className='tags '>
              {post.foodCategory.map((el, i) => (
                <li key={i}>
                  <a href='#' className='tag category'>
                    {el}
                  </a>
                </li>
              ))}
            </ul>
            <ul className='tags'>
              {post.dishType.map((el, i) => (
                <li key={i}>
                  <a href='#' className='tag type'>
                    {el}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
