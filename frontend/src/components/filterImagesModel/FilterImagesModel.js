import React, { useState, useEffect } from "react";

import { Space, Select } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

import { dishTypeOptions } from "../../assets/foodData";

import axios from "axios";

import "./filterImagesModel.css";

const FilterImagesModel = ({
  setFoodCatgoryPick,
  setRestaurantUserPick,
  setDishTypePick,
  setCityPick,
}) => {
  const [restaurantsList, setRestaurantsList] = useState([]);

  const styleSelect = {
    root: { width: "60%", margin: "auto" },
    input: { "&::placeholder": { textAlign: "center" } },
  };
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

  return (
    <>
      <form>
        <Select
          icon={<IconSearch size={16} />}
          data={restaurantsList}
          onChange={setRestaurantUserPick}
          placeholder='Search By Resraurant ...'
          searchable
          clearable
          styles={styleSelect}
        />

        <Space h='sm' />
        <Select
          icon={<IconSearch size={16} />}
          data={dishTypeOptions}
          onChange={setDishTypePick}
          placeholder='Whice Course ?'
          clearable
          styles={styleSelect}
        />
        <Space h='sm' />
        {/* <MultiSelect
          icon={<IconSearch size={16} />}
          data={foodCategoryOptions}
          onChange={setFoodCatgoryPick}
          placeholder='Whice Catgory ?'
          styles={styleSelect}
          clearable
        />{" "}
        <Space h='sm' /> */}
      </form>
    </>
  );
};
export default FilterImagesModel;
