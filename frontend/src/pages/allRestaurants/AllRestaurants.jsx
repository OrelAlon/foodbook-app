import React, { useEffect, useState } from "react";

import axios from "axios";

import NavBar from "../../components/navBar/NavBar";
import RestaurantCard from "../../components/restaurantCard/RestaurantCard";
import AddRestaurantModal from "../../components/addRestaurantModal/AddRestaurantModal";
import { IconSquarePlus, IconSearch } from "@tabler/icons";
import { Input } from "@mantine/core";

import "./allRestaurants.css";

const AllRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchRestaurant, setSearchRestaurant] = useState("");
  const [addRestaurantOpend, setAddRestaurantOpend] = useState(false);

  const styleSelect = {
    root: { width: "60%", margin: "auto" },
    input: { "&::placeholder": { textAlign: "center" } },
  };

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

      <AddRestaurantModal
        addRestaurantOpend={addRestaurantOpend}
        setAddRestaurantOpend={setAddRestaurantOpend}
      />

      <div className='restaurantSContainer'>
        <div className='center-div'>
          <h1 style={{ display: "inline-block" }}>
            Restaurants{" "}
            <span className='transform'>
              {" "}
              <IconSquarePlus
                className='add-btn'
                onClick={() => setAddRestaurantOpend(true)}
              />
            </span>
          </h1>
        </div>

        <Input
          icon={<IconSearch size={16} />}
          onChange={setSearchRestaurant}
          placeholder='Search By Resraurant...'
          clearable
          style={{ width: "80%", margin: "auto" }}
        />
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
