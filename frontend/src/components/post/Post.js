import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { AiOutlineLike } from "react-icons/ai";
import noAvatar from "../../assets/noAvatar.png";
import moment from "moment";
import axios from "axios";

import { Image } from "@mantine/core";

import "./post.css";

const Post = ({ post }) => {
  const [user, setUser] = useState({});
  const [restaurant, setRestaurant] = useState({});
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  const { user: currentUser } = useContext(AuthContext);
  const { username, profilePicture } = user;
  const { restaurantname } = restaurant;
  const { userId, restaurantId, _id, img, updatedAt, foodCategory, dishType } =
    post;

  const usernameParams = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/?userId=${userId}`);
      setUser(res.data);
    };
    const fetchRestaurant = async () => {
      const res = await axios.get(
        `/api/restaurants/?restaurantId=${restaurantId}`
      );

      setRestaurant(res.data);
    };
    fetchRestaurant();
    fetchUser();
  }, [userId, restaurantId]);

  const likeHandler = () => {
    try {
      axios.put(`/api/posts/${_id}/like`, { userId: currentUser._id });
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  const deleteHandler = async () => {
    try {
      await axios.delete(`/api/posts/${_id}`);
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
            <Link to={`/profile/${username}`}>
              <img
                className='postProfileImg'
                src={profilePicture ? profilePicture : noAvatar}
                alt=''
              />
            </Link>
            <span className='postUsername'>
              <Link to={`/profile/${username}`} className='linkwithout'>
                <span className='bold '> {username} </span>
              </Link>
              in{" "}
              <Link
                className='linkwithout'
                to={`/restaurant/${restaurantname}`}
              >
                <span className='restaurantname bold'>{restaurantname}</span>
              </Link>
            </span>{" "}
          </div>
          <div style={{ display: "flex", alignitems: "center" }}>
            {" "}
            <p className='posttime'>{moment(updatedAt).fromNow()}</p>
            {usernameParams === currentUser.username && (
              <div className='postTopRight delete' onClick={deleteHandler}>
                X{" "}
              </div>
            )}
          </div>
        </div>

        <div className='postCenter'>
          <img className='postImg' src={img} alt='' width='200' height='100' />
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
              {foodCategory.map((el, i) => (
                <li key={i}>
                  <a href='#' className='tag category'>
                    {el}
                  </a>
                </li>
              ))}
            </ul>
            <ul className='tags'>
              {dishType.map((el, i) => (
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
