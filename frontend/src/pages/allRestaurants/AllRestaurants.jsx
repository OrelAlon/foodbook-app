import { useEffect, useState } from "react";

import { fetchAllRestaurants } from "../../api/ApiFetch";

import NavBar from "../../components/navBar/NavBar";
import RestaurantCard from "../../components/restaurantCard/RestaurantCard";
import AddRestaurantModal from "../../components/addRestaurantModal/AddRestaurantModal";
import Loading from "../../components/loading/Loading";

import { IconSquarePlus, IconSearch } from "@tabler/icons";
import { Input } from "@mantine/core";

import "./allRestaurants.css";

const AllRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchRestaurant, setSearchRestaurant] = useState("");
  const [addRestaurantOpend, setAddRestaurantOpend] = useState(false);
  const [loading, setLoading] = useState(true);

  const searchLowerCase = searchRestaurant.toLowerCase();

  const fetchRestaurants = async () => {
    try {
      const res = await fetchAllRestaurants();
      setRestaurants(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
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
          onChange={(e) => setSearchRestaurant(e.target.value)}
          placeholder='Search By Restaurant...'
          style={{ width: "80%", margin: "auto" }}
          styles={{ input: { "&::placeholder": { textAlign: "center" } } }}
        />
        {loading ? (
          <Loading />
        ) : (
          <div className='restaurantsCards'>
            {restaurants
              .filter((rest) => {
                return searchLowerCase === ""
                  ? rest
                  : rest.restaurantname.toLowerCase().includes(searchLowerCase);
              })
              .map((restaurant) => (
                <RestaurantCard key={restaurant._id} restaurant={restaurant} />
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AllRestaurants;
