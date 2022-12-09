import { useState, useEffect } from "react";
import { useParams } from "react-router";

import axios from "axios";

import Navbar from "../../components/navbar/Navbar";
import RestaurantFeed from "../../components/feed/RestaurantFeed";

import "./restaurant.css";

const Restaurant = () => {
  const [restaurant, setRestaurant] = useState({});
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
      <Navbar />
      <div className='restaurantPage'>
        <div></div>
        <div className='restaurantRight'>
          <div className='restaurantInfo'>
            <img
              className='restaurantImg'
              src={restaurant.profilePicture}
              alt=''
            />

            {/* <h1 className='restaurantInfoName'>{restaurant.restaurantname}</h1> */}
            {/* <span className='restaurantInfoDesc'>{restaurant.desc}</span> */}
            {/* <img
              className='restaurantImg'
              src={restaurant.profilePicture}
              alt=''
            /> */}
          </div>

          <div className='restaurantRightBottom'>
            <RestaurantFeed restaurant={restaurant} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Restaurant;
