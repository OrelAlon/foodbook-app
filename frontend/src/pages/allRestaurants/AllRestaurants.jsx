import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../../components/navbar/Navbar";
import RestaurantCard from "../../components/restaurantCard/RestaurantCard";

import "./allRestaurants.css";

const AllRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await axios.get(`/api/restaurants/restaurants`);
      setRestaurants(res.data);
    };
    fetchRestaurants();
  }, []);
  return (
    <>
      <Navbar />
      <div className='restaurantSContainer'>
        <h1>AllRestaurants</h1>
        <input placeholder='Search restaurant' type={"search"}></input>
        <div className='restaurantsCards'>
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllRestaurants;
