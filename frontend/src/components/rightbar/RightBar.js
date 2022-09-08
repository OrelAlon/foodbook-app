import { useEffect, useState } from "react";
import { Restaurants } from "../../dummyData";

import FavoriteRestaurants from "../favoriteRest/FavoriteRestaurants";
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
        <div className='rightbarFav'></div>
        <h4 className='rightbarTitle'>Favorite Restaurants</h4>
        <ul className='rightbarRestList'>
          {restaurants.map((res) => (
            <FavoriteRestaurants key={res._id} restaurant={res} />
          ))}
        </ul>{" "}
      </div>
    </>
  );
};

export default RightBar;
