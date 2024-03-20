import { useEffect, useState } from "react";

import { fetchAllRestaurants, fetchAll } from "../../api/ApiFetch";

import NavBar from "../../components/navBar/NavBar";
import ItemCard from "../../components/itemCard/ItemCard";
import AddRestaurantModal from "../../components/addRestaurantModal/AddRestaurantModal";
import Loading from "../../components/loading/Loading";

import { IconSquarePlus, IconSearch } from "@tabler/icons";
import { Input } from "@mantine/core";

import "./allItemsPage.css";

const AllItemsPage = ({ type }) => {
  const [items, setItems] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [loading, setLoading] = useState(true);

  const [addRestaurantOpend, setAddRestaurantOpend] = useState(false);

  const searchLowerCase = searchItem.toLowerCase();

  const fetchdata = async () => {
    setItems([]);
    setLoading(true);

    try {
      const res = await fetchAll(type);
      setItems(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [type]);

  return (
    <>

      <AddRestaurantModal
        addRestaurantOpend={addRestaurantOpend}
        setAddRestaurantOpend={setAddRestaurantOpend}
      />

      <div className='restaurantSContainer'>
        <div className='center-div'>
          {type === "users" ? (
            <h1>Users</h1>
          ) : (
            <h1>
              Restaurants
              <span className='transform'>
                {" "}
                <IconSquarePlus
                  className='add-btn'
                  onClick={() => setAddRestaurantOpend(true)}
                />
              </span>
            </h1>
          )}
        </div>

        <Input
          icon={<IconSearch size={16} />}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder='Search...'
          style={{ width: "80%", margin: "auto" }}
          styles={{ input: { "&::placeholder": { textAlign: "center" } } }}
        />
        {loading && <Loading />}
        <div className='restaurantsCards'>
          {type === "restaurants" &&
            items
              .filter((item) => {
                return searchLowerCase === ""
                  ? item
                  : item.restaurantname.toLowerCase().includes(searchLowerCase);
              })
              .map((restaurant, i) => (
                <ItemCard key={i} restaurant={restaurant} type={type} />
              ))}
          {type === "users" &&
            items
              .filter((item) => {
                return searchLowerCase === ""
                  ? item
                  : item.username.toLowerCase().includes(searchLowerCase);
              })
              .map((user, i) => <ItemCard key={i} user={user} type={type} />)}
        </div>
      </div>
    </>
  );
};

export default AllItemsPage;
