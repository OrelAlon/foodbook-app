import { useEffect, useState } from "react";

import axios from "axios";

import RestaurantCard from "../../components/restaurantCard/RestaurantCard";
import NavMenu from "../../components/navMenu/NavMenu";
import ShareImageModal from "../../components/shareImageModal/ShareImageModal";
import AddRestaurantModal from "../../components/addRestaurantModal/AddRestaurantModal";
import Logo from "../../components/logo/Logo";

import "./allRestaurants.css";

const AllRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchRestaurant, setSearchRestaurant] = useState("");
  const [shareImageOpened, setShareImageOpened] = useState(false);
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
      <Logo />
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
