import { useState, useEffect } from "react";
import { useParams } from "react-router";

import axios from "axios";

import Navbar from "../../components/navbar/Navbar";
import UserFeed from "../../components/feed/UserFeed";
import RightBar from "../../components/rightbar/RightBar";

import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState({});
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
      <Navbar />
      <div className='profile'>
        <div className='profileRight'>
          <div className='profileRightTop'>
            <div className='profileCover'>
              <img
                className='profileCoverImg'
                src={PF + "noCover.png"}
                alt=''
              />
              <img
                className='profileUserImg'
                src={PF + user.profilePicture}
                alt=''
              />
            </div>
          </div>
          <div className='margin-top'></div>

          <div className='profileRightBottom'>
            <UserFeed username={username} />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
