import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

import { fetchUserData } from "../../api/ApiFetch";
import { IconEdit } from "@tabler/icons";

import NavBar from "../../components/navBar/NavBar";
import StarBtn from "../../components/starBtn/StarBtn";
import noImage from "../../assets/noImage2.jpg";
import ProfileFeed from "../../components/profileFeed/ProfileFeed";

import st from "../../assets/st.jpg";
import "./userProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [postsLength, setPostsLength] = useState([]);
  const [star, setStar] = useState();
  const [isStar, setIsStar] = useState();
  const [loading, setLoading] = useState(false);
  const { user: currentUser } = useContext(AuthContext);

  const usernameParams = useParams().username;

  const checkIfStar =
    user && user.stars ? user.stars.includes(currentUser._id) : false;

  useEffect(() => {
    setIsStar(checkIfStar);
  }, [checkIfStar]);

  const fetchUser = async () => {
    const res = await fetchUserData(usernameParams);
    setUser(res.data);
    setStar(res.data.stars.length);
  };

  useEffect(() => {
    fetchUser();
  }, [usernameParams]);

  const starHandler = async () => {
    setLoading(true);

    try {
      await axios.put(`/api/users/${user._id}/star`, {
        userId: currentUser._id,
      });
      if (!isStar) {
        setStar((prevStar) => prevStar + 1);

        setIsStar(true);
      } else if (isStar) {
        setStar((prevStar) => prevStar - 1);
        setIsStar(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
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

                <StarBtn
                  starHandler={starHandler}
                  loading={loading}
                  isStar={isStar}
                />
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
                    <strong>
                      {star}
                      {/* {user && user.stars ? user.stars.length : 0} */}
                    </strong>
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
