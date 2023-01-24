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
  console.log(items);
  const [addRestaurantOpend, setAddRestaurantOpend] = useState(false);

  console.log(type);
  const searchLowerCase = searchItem.toLowerCase();

  const fetchdata = async () => {
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
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder='Search By Restaurant...'
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
                <ItemCard key={i} restaurant={restaurant} />
              ))}
          {type === "users" &&
            items
              .filter((item) => {
                return searchLowerCase === ""
                  ? item
                  : item.username.toLowerCase().includes(searchLowerCase);
              })
              .map((user, i) => <ItemCard key={i} user={user} />)}
        </div>
      </div>
    </>
  );
};

export default AllItemsPage;
