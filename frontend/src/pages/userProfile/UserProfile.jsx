import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

import { fetchUserData } from "../../api/ApiFetch";
import { IconEdit } from "@tabler/icons";

import NavBar from "../../components/navBar/NavBar";
import FollowBtn from "../../components/followBtn/FollowBtn";
import noImage from "../../assets/noImage2.jpg";
import ProfileFeed from "../../components/profileFeed/ProfileFeed";

import st from "../../assets/st.jpg";
import "./userProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [postsLength, setPostsLength] = useState([]);

  const usernameParams = useParams().username;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetchUserData(usernameParams);
      setUser(res.data);
    };
    fetchUser();
  }, [usernameParams]);

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

                <FollowBtn />
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
                    <strong>3</strong>
                    <span>Stars</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          {" "}
          <ProfileFeed
            username={usernameParams}
            setPostsLength={setPostsLength}
          />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
