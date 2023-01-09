import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

import axios from "axios";

import { IconEdit } from "@tabler/icons";

import NavBar from "../../components/navBar/NavBar";
import UserFeed from "../../components/feed/UserFeed";
import FollowBtn from "../../components/followBtn/FollowBtn";
import noImage from "../../assets/noImage2.jpg";

import st from "../../assets/st.jpg";
import "./userProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [followers, setFollowers] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);
  const [postsLength, setPostsLength] = useState([]);

  const usernameParams = useParams().username;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/?username=${usernameParams}`);
      setUser(res.data);
    };
    fetchUser();
  }, [usernameParams]);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setFollowers(user.followers.length);
    }
  }, [user]);

  const followHandler = () => {
    try {
      axios.put(`/api/users/${user._id}/followuser`, {
        userId: currentUser._id,
      });
    } catch (error) {
      console.log(error);
    }
    setFollowers(isFollowed ? followers - 1 : followers + 1);
    setIsFollowed(!isFollowed);
  };

  return (
    <>
      <NavBar />

      {/* feed */}
      <div className='profile-page-container'>
        <div>
          <div className='content-profile-page'>
            <div className='profile-page card'>
              <div className='img-profile'>
                <img className='profile-bgHome' src={st} alt='' />
                <img
                  className='avatar'
                  src={user.profilePicture || noImage}
                  alt='profile-image'
                />

                <FollowBtn followHandler={followHandler} />
                {usernameParams === currentUser.username && (
                  <Link to={`/editprofile/${user.username}`} className='none'>
                    <span className='icon'>
                      <IconEdit />
                    </span>
                  </Link>
                )}
              </div>

              <div className='profile-data'>
                <h3>{user.username}</h3>
                {/* <p>github.com/jofpin</p> */}
              </div>
              <div className='description-profile'>{user.desc}</div>
              <ul className='data'>
                <li>
                  <a>
                    <strong>{postsLength}</strong>
                    <span>Posts</span>
                  </a>
                </li>
                <li>
                  <a>
                    <strong>{followers}</strong>
                    <span>Followers</span>
                  </a>
                </li>
                <li>
                  <a>
                    <strong>TBD</strong>
                    <span>Following</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          {" "}
          <UserFeed username={usernameParams} setPostsLength={setPostsLength} />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
