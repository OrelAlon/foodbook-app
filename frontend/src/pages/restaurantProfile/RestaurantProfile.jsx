import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";

import { AuthContext } from "../../context/AuthContext";

import axios from "axios";

import NavMenu from "../../components/navMenu/NavMenu";
import ShareImageModal from "../../components/shareImageModal/ShareImageModal";
import RestaurantFeed from "../../components/feed/RestaurantFeed";
import FollowRestaurant from "../../components/followRestaurant/FollowRestaurant";
import Logo from "../../components/logo/Logo";

import noImage from "../../assets/noImage2.jpg";
import classy from "../../assets/classy-rest.jpg";
import "./restaurantProfile.css";

const RestaurantProfile = () => {
  const [restaurant, setRestaurant] = useState({});
  const [shareImageOpened, setShareImageOpened] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);

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

  const followRestaurantHandler = () => {
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
      </div>
      {/* feed */}

      <div className='profile-page-container'>
        <div>
          <div className='content-profile-page'>
            <div className='profile-page card'>
              <div className='img-profile'>
                <img className='profile-bgHome' src={classy} />
                <img
                  className='avatar'
                  src={restaurant.profilePicture || noImage}
                  alt='jofpin'
                />
                <FollowRestaurant
                  followRestaurantHandler={followRestaurantHandler}
                />
              </div>
              <div className='profile-data'>
                <h3>{restaurant.restaurantname}</h3>
                {/* <p>github.com/jofpin</p> */}
              </div>
              <div className='description-profile'>{restaurant.desc}</div>
              <ul className='data'>
                <li>
                  <a>
                    <strong>3390</strong>
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
                    <strong>239</strong>
                    <span>Following</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>{/* <h3>search bar option</h3> */}</div>
        <div>
          <RestaurantFeed restaurant={restaurant} />
        </div>
      </div>
    </>
  );
};

export default RestaurantProfile;
