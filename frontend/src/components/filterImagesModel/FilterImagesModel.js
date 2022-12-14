import { useContext, useState, useEffect } from "react";

import { MultiSelect, Input, Space, Select } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

import {
  foodCategoryOptions,
  dishTypeOptions,
  Prices,
} from "../../assets/foodData";

const FilterImagesModel = ({ restaurantUserPick }) => {
  const [restaurantUserPick, setRestaurantUserPick] = useState(null);
  const [dishTypePick, setDishTypePick] = useState([]);
  const [foodCatgoryPick, setFoodCatgoryPick] = useState([]);

  return (
    <>
      <Input
        icon={<IconSearch size={16} />}
        onChange={setRestaurantUserPick}
        placeholder='What on your Search Mind ?'
        style={{ width: "50%", margin: "auto" }}
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
    </>
  );
};
export default FilterImagesModel;
