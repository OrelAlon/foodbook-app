import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import axios from "axios";

import NavMenu from "../../components/navMenu/NavMenu";
import ShareImageModal from "../../components/shareImageModal/ShareImageModal";
import RestaurantFeed from "../../components/feed/RestaurantFeed";

import classy from "../../assets/classy-rest.jpg";
import "./restaurantProfile.css";

const RestaurantProfile = () => {
  const [restaurant, setRestaurant] = useState({});
  const [shareImageOpened, setShareImageOpened] = useState(false);

  const restaurantname = useParams().restaurantname;

  useEffect(() => {
    const fetchRestaurant = async () => {
      const res = await axios.get(
        `/api/restaurants/?restaurantname=${restaurantname}`
      );
      setRestaurant(res.data);
      console.log(res.data);
      console.log(restaurantname);
    };
    fetchRestaurant();
  }, [restaurantname]);

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
      </div>

      <div className='profile-page-container'>
        <div>
          <div class='content-profile-page'>
            <div class='profile-page card'>
              <div class='img-profile'>
                <img class='profile-bgHome' src={classy} />
                <img
                  class='avatar'
                  src={restaurant.profilePicture}
                  alt='jofpin'
                />
              </div>
              <button>Follow</button>
              <div class='profile-data'>
                <h3>{restaurant.restaurantname}</h3>
                {/* <p>github.com/jofpin</p> */}
              </div>
              <div class='description-profile'>{restaurant.desc}</div>
              <ul class='data'>
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
