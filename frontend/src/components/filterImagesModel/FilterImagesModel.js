import { useState, useEffect } from "react";

import { fetchAllRestaurants } from "../../api/ApiFetch";
import { Space, Select } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

import { cities } from "../../api/foodData";

import "./filterImagesModel.css";

const FilterImagesModel = ({ setRestaurantUserPick, setCityPick }) => {
  const [restaurantsList, setRestaurantsList] = useState([]);

  const styleSelect = {
    root: { width: "80%", margin: "auto" },
    input: { "&::placeholder": { textAlign: "center" } },
  };
  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await fetchAllRestaurants();

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
          data={cities}
          onChange={setCityPick}
          placeholder='City'
          searchable
          clearable
          styles={styleSelect}
        />

        <Space h='sm' />
      </form>
    </>
  );
};
export default FilterImagesModel;
