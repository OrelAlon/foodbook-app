import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";

import { AuthContext } from "../../context/AuthContext";
import { fetchRestaurantData } from "../../api/ApiFetch";

import NavBar from "../../components/navBar/NavBar";
import ProfileFeed from "../../components/profileFeed/ProfileFeed";
import StarBtn from "../../components/starBtn/StarBtn";

import noImage from "../../assets/noImage2.jpg";
import classy from "../../assets/classy-rest.jpg";

import "./restaurantProfile.css";

const RestaurantProfile = () => {
  const [restaurant, setRestaurant] = useState({});
  const [postsLength, setPostsLength] = useState([]);

  const restaurantnameParams = useParams().restaurantname;

  // useEffect(() => {
  //   if (Object.keys(restaurant).length !== 0) {
  //     setFollowers(restaurant.followers.length);
  //   }
  // }, [restaurant]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const res = await fetchRestaurantData(restaurantnameParams);

      setRestaurant(res.data);
    };
    fetchRestaurant();
  }, [restaurantnameParams]);

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
                <StarBtn />
              </div>
              <div className='profile-data'>
                <h3>{restaurant.restaurantname}</h3>
                <p>{restaurant.city}</p>
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
                    <strong>5</strong>
                    <span>Stars</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <ProfileFeed
            restaurantname={restaurantnameParams}
            setPostsLength={setPostsLength}
          />
        </div>
      </div>
    </>
  );
};

export default RestaurantProfile;
