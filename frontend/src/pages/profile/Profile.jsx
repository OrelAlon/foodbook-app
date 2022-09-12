import { useState, useEffect } from "react";
import { useParams } from "react-router";

import axios from "axios";

import TopBar from "../../components/topbar/TopBar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RightBar";

import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState({});
  const username = useParams().username;

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/?username=${username}`);
      //   console.log(res.data);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <TopBar />
      <div className='profile'>
        <div className='profileRight'>
          <div className='profileRightTop'>
            <div className='profileCover'>
              <img
                className='profileCoverImg'
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "noCover.jpg"
                }
                alt=''
              />
              <img
                className='profileUserImg'
                src={user ? PF + user.profilePicture : PF + "noAvatar.png"}
                alt=''
              />
            </div>
            {/* <div className='profileInfo'>
              <h1 className='profileInfoName'>{user.username}</h1>
              <span className='profileInfoDesc'>{user.desc}</span>
            </div> */}
          </div>
          <div className='margin-top'></div>

          <div className='profileRightBottom'>
            <Feed username={username} />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
