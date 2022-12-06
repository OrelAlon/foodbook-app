import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { AiOutlineLike } from "react-icons/ai";

import moment from "moment";
import axios from "axios";

import heart from "../../assets/heart.png";

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
                    : "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
                }
                alt=''
              />
            </Link>
            <span className='postUsername'>
              <span className='bold'> {user.username} </span>in{" "}
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
            src={PF + post.img}
            alt=''
            width='200'
            height='100'
          />
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <AiOutlineLike
              fontSize={22}
              className='likeIcon'
              onClick={likeHandler}
              color={"blue"}
            />
            <span className='postLikeCounter'>{like} people like it</span>
          </div>
          <div className='postBottomRight'>
            {" "}
            <p className='postText'>{post.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
