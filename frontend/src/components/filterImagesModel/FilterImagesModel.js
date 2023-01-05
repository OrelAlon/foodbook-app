import { useState, useEffect } from "react";

import { MultiSelect, Space, Select } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

import {
  foodCategoryOptions,
  dishTypeOptions,
  cities,
} from "../../assets/foodData";

import axios from "axios";

import "./filterImagesModel.css";

const FilterImagesModel = ({
  setFoodCatgoryPick,
  setRestaurantUserPick,
  setDishTypePick,
  setCityPick,
}) => {
  const [restaurantsList, setRestaurantsList] = useState([]);

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
          style={{ width: "60%", margin: "auto" }}
          searchable
          clearable
        />
        {/* <Space h='sm' />
        <Select
          icon={<IconSearch size={16} />}
          data={cities}
          onChange={setCityPick}
          placeholder='Search By City ...'
          style={{ width: "60%", margin: "auto" }}
          searchable
          clearable
        /> */}
        <Space h='sm' />
        <MultiSelect
          icon={<IconSearch size={16} />}
          data={dishTypeOptions}
          onChange={setDishTypePick}
          placeholder='Whice Course ?'
          style={{ width: "60%", margin: "auto", textAlign: "center" }}
        />
        <Space h='sm' />
        <MultiSelect
          icon={<IconSearch size={16} />}
          data={foodCategoryOptions}
          onChange={setFoodCatgoryPick}
          // label='If you want to be EXTRA specific:'
          placeholder='Whice Catgory ?'
          style={{ width: "60%", margin: "auto" }}
        />{" "}
        <Space h='sm' />
        {/* <div className='slide-div'>
          <Slider
            label={(val) => Prices.find((p) => p.value === val).label}
            defaultValue={50}
            step={25}
            onChange={setPricePick}
            value={pricePick}
            marks={Prices}
            styles={{
              markLabel: { display: "none" },
            }}
          />
        </div> */}
      </form>
    </>
  );
};
export default FilterImagesModel;
