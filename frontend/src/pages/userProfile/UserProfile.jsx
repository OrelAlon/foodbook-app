import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import axios from "axios";

import NavMenu from "../../components/navMenu/NavMenu";
import ShareImageModal from "../../components/shareImageModal/ShareImageModal";
import UserFeed from "../../components/feed/UserFeed";

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
      <div className='profile'>
        <div className='profileRight'>
          <div className='profileRightTop'>
            <div className='profileCover'>
              <img
                className='profileCoverImg'
                src={PF + "noCover.jpg"}
                alt=''
              />
              <img
                className='profileUserImg'
                src={user.profilePicture}
                alt=''
              />
            </div>
          </div>
          <div className='margin-top'></div>

          <div className='profileRightBottom'>
            <UserFeed username={username} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
