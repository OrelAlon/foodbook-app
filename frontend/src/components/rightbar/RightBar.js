import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Restaurants } from "../../dummyData";

import RestaurantsList from "../restaurantsList/RestaurantsList";
import axios from "axios";

import "./rightbar.css";

const RightBar = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await axios.get(`/restaurants/restaurants`);
      setRestaurants(res.data);
    };
    fetchRestaurants();
  }, []);

  return (
    <>
      <div className='rightbar'>
        <div className='rightbar'>
          <h4 className='rightbarTitle'>Restaurants:</h4>
          <ul className='rightbarRestList'>
            {restaurants.map((res) => (
              <RestaurantsList key={res._id} restaurant={res} />
            ))}
          </ul>{" "}
        </div>
        <Link to='/addrestaurant' className='linkTimeLine'>
          <button className='addBtn'>Add Restaurant</button>{" "}
        </Link>
      </div>
    </>
  );
};

export default RightBar;
