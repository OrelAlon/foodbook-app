import { useState, useEffect } from "react";
import { useParams } from "react-router";

import axios from "axios";

import TopBar from "../../components/topbar/TopBar";
import RestaurantFeed from "../../components/feed/RestaurantFeed";
import RightBar from "../../components/rightbar/RightBar";

import "./restaurant.css";

const Restaurant = () => {
  const [restaurant, setRestaurant] = useState({});
  const restaurantname = useParams().restaurantname;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

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
      <TopBar />
      <div className='restaurantPage'>
        <div></div>
        <div className='restaurantRight'>
          <div className='restaurantInfo'>
            <img
              className='restaurantImg'
              src={PF + restaurant.profilePicture}
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
            <RightBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Restaurant;
