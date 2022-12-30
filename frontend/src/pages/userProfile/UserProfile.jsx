import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";

import { AuthContext } from "../../context/AuthContext";

import axios from "axios";

import NavMenu from "../../components/navMenu/NavMenu";
import ShareImageModal from "../../components/shareImageModal/ShareImageModal";
import UserFeed from "../../components/feed/UserFeed";
import FollowBtn from "../../components/followBtn/FollowBtn";
import Logo from "../../components/logo/Logo";

import st from "../../assets/st.jpg";
import "./userProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [shareImageOpened, setShareImageOpened] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);
  const [postsLength, setPostsLength] = useState([]);

  const username = useParams().username;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

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
      {/* navbar */}
      <Logo />
      <div className='menu-div'>
        {" "}
        <button
          onClick={() => setShareImageOpened(true)}
          className='add-image-btn'
        >
          📷
        </button>
        <NavMenu />
        <ShareImageModal
          shareImageOpened={shareImageOpened}
          setShareImageOpened={setShareImageOpened}
        />
      </div>{" "}
      {/* feed */}
      <div className='profile-page-container'>
        <div>
          <div className='content-profile-page'>
            <div className='profile-page card'>
              <div className='img-profile'>
                <img className='profile-bgHome' src={st} alt='' />
                <img
                  className='avatar'
                  src={user.profilePicture}
                  alt='jofpin'
                />
                <FollowBtn followHandler={followHandler} />
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
                    <strong>On Build</strong>
                    <span>Following</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          {" "}
          <UserFeed username={username} setPostsLength={setPostsLength} />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
