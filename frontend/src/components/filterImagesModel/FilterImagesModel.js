import { useContext, useState, useEffect } from "react";

import { Input, Space, Select, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

import {
  foodCategoryOptions,
  dishTypeOptions,
  Prices,
} from "../../assets/foodData";

import axios from "axios";

import "./filterImagesModel.css";

const FilterImagesModel = (props) => {
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [value, setValue] = useState(null);

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
    props.onSubmit({ restaurantUserPick, dishTypePick, foodCatgoryPick });
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
          placeholder='What on your Search Mind ?'
          style={{ width: "60%", margin: "auto" }}
          searchable
        />
        <Space h='sm' />
        <Select
          data={dishTypeOptions}
          onChange={setDishTypePick}
          input='center'
          placeholder='Whice Course ?'
          style={{ width: "40%", margin: "auto", textAlign: "center" }}
        />
        <Space h='sm' />
        <Select
          data={foodCategoryOptions}
          onChange={setFoodCatgoryPick}
          placeholder='Whice Catgory ?'
          style={{ width: "40%", margin: "auto" }}
        />{" "}
        <Space h='sm' />
        <div className='center-div'>
          <Button variant='default' style={{ margin: "auto" }} type={"submit"}>
            Search <br /> <IconSearch size={16} />
          </Button>
        </div>
      </form>
    </>
  );
};
export default FilterImagesModel;
