import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";

import { AuthContext } from "../../context/AuthContext";

import axios from "axios";

import NavBar from "../../components/navBar/NavBar";
import RestaurantFeed from "../../components/feed/RestaurantFeed";
import FollowBtn from "../../components/followBtn/FollowBtn";

import noImage from "../../assets/noImage2.jpg";
import classy from "../../assets/classy-rest.jpg";

import "./restaurantProfile.css";

const RestaurantProfile = () => {
  const [restaurant, setRestaurant] = useState({});
  const [followers, setFollowers] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);
  const [postsLength, setPostsLength] = useState([]);

  const restaurantname = useParams().restaurantname;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (Object.keys(restaurant).length !== 0) {
      setFollowers(restaurant.followers.length);
    }
  }, [restaurant]);

  useEffect(() => {
    fetchRestaurant();
  }, [restaurantname]);

  const fetchRestaurant = async () => {
    const res = await axios.get(
      `/api/restaurants/?restaurantname=${restaurantname}`
    );
    setRestaurant(res.data);
  };

  const followHandler = () => {
    try {
      axios.put(`/api/restaurants/${restaurant._id}/followrestaurant`, {
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
                <img className='profile-bgHome' src={classy} alt='classy' />
                <img
                  className='avatar'
                  src={restaurant.profilePicture || noImage}
                  alt='jofpin'
                />
                <FollowBtn followHandler={followHandler} />
              </div>
              <div className='profile-data'>
                <h3>{restaurant.restaurantname}</h3>
                {/* <p>github.com/jofpin</p> */}
              </div>
              <div className='description-profile'>{restaurant.desc}</div>
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
              </ul>
            </div>
          </div>
        </div>
        <div>{/* <h3>search bar option</h3> */}</div>
        <div>
          <RestaurantFeed
            restaurant={restaurant}
            setPostsLength={setPostsLength}
          />
        </div>
      </div>
    </>
  );
};

export default RestaurantProfile;
