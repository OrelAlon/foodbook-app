import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import axios from "axios";

import NavMenu from "../../components/navMenu/NavMenu";
import ShareImageModal from "../../components/shareImageModal/ShareImageModal";
import UserFeed from "../../components/feed/UserFeed";

import st from "../../assets/st.jpg";
import "./userProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [shareImageOpened, setShareImageOpened] = useState(false);

  const username = useParams().username;

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      {/* navbar */}
      <Link to='/' style={{ textDecoration: "none" }}>
        <p className='logo'>Foodbook</p>
      </Link>
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
                <img className='profile-bgHome' src={st} />
                <img
                  className='avatar'
                  src={user.profilePicture}
                  alt='jofpin'
                />
              </div>
              <button>Follow</button>
              <div className='profile-data'>
                <h3>{user.username}</h3>
                {/* <p>github.com/jofpin</p> */}
              </div>
              <div className='description-profile'>{user.desc}</div>
              <ul className='data'>
                <li>
                  <a>
                    <strong>2</strong>
                    <span>Posts</span>
                  </a>
                </li>
                <li>
                  <a>
                    <strong>4</strong>
                    <span>Followers</span>
                  </a>
                </li>
                <li>
                  <a>
                    <strong>8</strong>
                    <span>Following</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h3>search bar</h3>
        </div>
        <div>
          {" "}
          <UserFeed username={username} />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
