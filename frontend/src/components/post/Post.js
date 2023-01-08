import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { AiOutlineLike } from "react-icons/ai";

import TagPost from "../tagPost/TagPost";
import noAvatar from "../../assets/noAvatar.png";
import ImageModal from "../imageModal/ImageModal";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import axios from "axios";

import "./post.css";

const Post = ({ post }) => {
  const [user, setUser] = useState({});
  const [restaurant, setRestaurant] = useState({});
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [openedImage, setOpenedImage] = useState(false);

  const { user: currentUser } = useContext(AuthContext);
  const { username, profilePicture } = user;
  const { restaurantname } = restaurant;
  const { userId, restaurantId, _id, img, updatedAt, foodCategory, dishType } =
    post;
  const usernameParams = useParams().username;
  dayjs.extend(relativeTime);

  const postTime = dayjs(updatedAt).fromNow();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resUser, resRest] = await Promise.all([
          axios.get(`/api/users/?userId=${userId}`),
          axios.get(`/api/restaurants/?restaurantId=${restaurantId}`),
        ]);
        setUser(resUser.data);
        setRestaurant(resRest.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
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
    if (window.confirm(`Are you sure you want to delete this post??`)) {
      try {
        await axios.delete(`/api/posts/${_id}`);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
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
              at{" "}
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
            <p className='posttime'>{postTime}</p>
            {usernameParams === currentUser.username ||
              (currentUser.isAdmin && (
                <div className='postTopRight delete' onClick={deleteHandler}>
                  X{" "}
                </div>
              ))}
          </div>
        </div>

        <div className='postCenter'>
          {" "}
          <img
            className='postImg'
            src={img}
            alt=''
            // width='200'
            // height='100'
            onClick={() => setOpenedImage(true)}
          />
          <ImageModal
            img={img}
            openedImage={openedImage}
            setOpenedImage={setOpenedImage}
          ></ImageModal>
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft transform'>
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
                <TagPost key={i} el={el} />
              ))}
            </ul>
            <ul className='tags'>
              {dishType.map((el, i) => (
                <TagPost key={i} el={el} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
