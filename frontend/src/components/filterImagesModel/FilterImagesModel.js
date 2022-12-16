import { useContext, useState, useEffect } from "react";

import { MultiSelect, Space, Select, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

import {
  foodCategoryOptions,
  dishTypeOptions,
  Prices,
} from "../../assets/foodData";

import axios from "axios";

import "./filterImagesModel.css";

const FilterImagesModel = ({ posts, setSearchResults }) => {
  const [restaurantsList, setRestaurantsList] = useState([]);

  const [restaurantUserPick, setRestaurantUserPick] = useState(null);
  const [dishTypePick, setDishTypePick] = useState(null);
  const [foodCatgoryPick, setFoodCatgoryPick] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await axios.get(`/api/restaurants/restaurants`);
      sortRestaurants(res.data);
    };

    const sortRestaurants = (res) => {
      let arr = [];
      res.map((el) => {
        arr.push({
          value: el._id,
          label: el.restaurantname,
          group: el.city,
        });
      });
      return setRestaurantsList(
        arr.sort((a, b) =>
          a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1
        )
      );
    };

    fetchRestaurants();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!restaurantUserPick) return setSearchResults(posts);

    const resultsArray = posts.filter((post) =>
      post.restaurantId.includes(restaurantUserPick)
    );

    setSearchResults(resultsArray);
  };

  const handleClear = () => {
    setSearchResults(posts);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Select
          icon={<IconSearch size={16} />}
          data={restaurantsList}
          value={restaurantUserPick}
          onChange={setRestaurantUserPick}
          label='Resraurant:'
          placeholder='Where ?'
          style={{ width: "60%", margin: "auto" }}
          searchable
        />
        <Space h='sm' />
        {/* <MultiSelect
          icon={<IconSearch size={16} />}
          data={dishTypeOptions}
          onChange={setDishTypePick}
          // label='If you want to be more specific:'
          placeholder='Whice Course ?'
          style={{ width: "60%", margin: "auto", textAlign: "center" }}
          searchable
        />
        <Space h='sm' />
        <MultiSelect
          icon={<IconSearch size={16} />}
          data={foodCategoryOptions}
          onChange={setFoodCatgoryPick}
          // label='If you want to be EXTRA specific:'
          placeholder='Whice Catgory ?'
          style={{ width: "60%", margin: "auto" }}
          searchable
        />{" "} */}
        <Space h='sm' />
        <div className='center-div'>
          <Button
            variant='default'
            style={{ margin: "auto" }}
            onClick={handleClear}
          >
            Clear <br /> <IconSearch size={16} />
          </Button>
          <Button variant='default' style={{ margin: "auto" }} type={"submit"}>
            Search <br /> <IconSearch size={16} />
          </Button>
        </div>
      </form>
    </>
  );
};
export default FilterImagesModel;
