import { useContext, useState, useEffect } from "react";

import { Input, Space, Select, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

import {
  foodCategoryOptions,
  dishTypeOptions,
  Prices,
} from "../../assets/foodData";

import "./filterImagesModel.css";

const FilterImagesModel = (props) => {
  const [restaurantUserPick, setRestaurantUserPick] = useState(
    "638f6370b5ba4755ecbff413"
  );
  const [dishTypePick, setDishTypePick] = useState(null);
  const [foodCatgoryPick, setFoodCatgoryPick] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({ restaurantUserPick, dishTypePick, foodCatgoryPick });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          icon={<IconSearch size={16} />}
          // onChange={setRestaurantUserPick}
          placeholder='What on your Search Mind ?'
          style={{ width: "60%", margin: "auto" }}
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
