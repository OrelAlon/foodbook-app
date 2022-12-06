import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../../components/navbar/Navbar";
import RestaurantCard from "../../components/restaurantCard/RestaurantCard";

import "./allRestaurants.css";

const AllRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchRestaurant, setSearchRestaurant] = useState("");

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
      <button className='addRestaurantBtn'>Add Restaurant</button>
      <div className='restaurantSContainer'>
        <h1>All - Restaurants</h1>
        <input
          className='restaurantSearch'
          placeholder='Search restaurant'
          type={"search"}
          onChange={(e) => setSearchRestaurant(e.target.value)}
        ></input>
        <div className='restaurantsCards'>
          {restaurants
            .filter((rest) => {
              return searchRestaurant.toLowerCase() === ""
                ? rest
                : rest.restaurantname.toLowerCase().includes(searchRestaurant);
            })
            .map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
        </div>
      </div>
    </>
  );
};

export default AllRestaurants;
