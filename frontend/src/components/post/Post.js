import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import noAvatar from "../../assets/noAvatar.png";
import AllTags from "../allTags/AllTags";
import LikePost from "../likePost/LikePost";
import DeletePost from "../deletePost/DeletePost";
import TimePost from "../timePost/TimePost";

import axios from "axios";

import "./post.css";

const Post = React.forwardRef(({ post }, ref) => {
  const [user, setUser] = useState({});

  const { user: currentUser } = useContext(AuthContext);

  const {
    userId,
    username,
    restaurantname,
    _id,
    img,
    createdAt,
    foodCategory,
    dishType,
  } = post;
  const usernameParams = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resUser = await axios.get(`/api/users/?userId=${userId}`);
        setUser(resUser.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className='post' ref={ref}>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <Link to={`/profile/${username}`}>
              <img
                className='postProfileImg'
                src={user.profilePicture || noAvatar}
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
            <div className='posttime'>
              <TimePost createdAt={createdAt} />
            </div>
            {currentUser.isAdmin && usernameParams !== currentUser.username && (
              <>
                <DeletePost id={_id} />{" "}
              </>
            )}
            {usernameParams === currentUser.username && <DeletePost id={_id} />}
          </div>
        </div>

        <div className='postCenter'>
          {" "}
          <Link to={`/post/${_id}`}>
            <img className='postImg' src={img} alt={img} />
          </Link>
        </div>
        <div className='postBottom '>
          <LikePost id={_id} likes={post.likes} />
          {/* <DisLikePost id={_id} disLikes={post.disLikes} /> */}

          <div className='postBottomRight'>
            <AllTags foodCategory={foodCategory} dishType={dishType} />{" "}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Post;
