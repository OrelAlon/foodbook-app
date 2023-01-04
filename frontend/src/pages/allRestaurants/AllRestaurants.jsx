import { useEffect, useState } from "react";

import axios from "axios";

import NavBar from "../../components/navBar/NavBar";
import RestaurantCard from "../../components/restaurantCard/RestaurantCard";
import AddRestaurantModal from "../../components/addRestaurantModal/AddRestaurantModal";

import "./allRestaurants.css";

const AllRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchRestaurant, setSearchRestaurant] = useState("");
  const [addRestaurantOpend, setAddRestaurantOpend] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await axios.get(`/api/restaurants/restaurants`);
      setRestaurants(res.data);
    };
    fetchRestaurants();
  }, []);

  return (
    <>
      <NavBar />
      <button
        className='addRestaurantBtn'
        onClick={() => setAddRestaurantOpend(true)}
      >
        Add Restaurant
      </button>

      <AddRestaurantModal
        addRestaurantOpend={addRestaurantOpend}
        setAddRestaurantOpend={setAddRestaurantOpend}
      />

      <div className='restaurantSContainer'>
        <h1 style={{ color: "rad" }}>All - Restaurants</h1>
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
