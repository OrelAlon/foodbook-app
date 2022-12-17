import { useState, useEffect } from "react";
import { useParams } from "react-router";

import axios from "axios";

import NavMenu from "../../components/navMenu/NavMenu";
import ShareImageModal from "../../components/shareImageModal/ShareImageModal";
import RestaurantFeed from "../../components/feed/RestaurantFeed";
import Logo from "../../components/logo/Logo";

import classy from "../../assets/classy-rest.jpg";
import "./restaurantProfile.css";

const RestaurantProfile = () => {
  const [restaurant, setRestaurant] = useState({});
  const [shareImageOpened, setShareImageOpened] = useState(false);

  const restaurantname = useParams().restaurantname;

  const fetchRestaurant = async () => {
    const res = await axios.get(
      `/api/restaurants/?restaurantname=${restaurantname}`
    );
    setRestaurant(res.data);
  };

  useEffect(() => {
    fetchRestaurant();
  }, [restaurantname]);

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
                  src={restaurant.profilePicture}
                  alt='jofpin'
                />
              </div>
              <button>Follow</button>
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
                    <strong>718</strong>
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
        <div>
          <h3>search bar</h3>
        </div>
        <div>
          <RestaurantFeed restaurant={restaurant} />
        </div>
      </div>
    </>
  );
};

export default RestaurantProfile;
