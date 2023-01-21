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

const Post = ({ post }) => {
  const [user, setUser] = useState({});
  const [restaurant, setRestaurant] = useState({});

  const { user: currentUser } = useContext(AuthContext);
  const { username, profilePicture } = user;
  const { restaurantname } = restaurant;
  const { userId, restaurantId, _id, img, updatedAt, foodCategory, dishType } =
    post;
  const usernameParams = useParams().username;

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
            <div className='posttime'>
              <TimePost updatedAt={updatedAt} />
            </div>
            {currentUser.isAdmin && usernameParams !== currentUser.username && (
              <DeletePost id={_id} />
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
};

export default Post;
