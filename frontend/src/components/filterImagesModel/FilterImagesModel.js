import { useState, useEffect } from 'react';
import { fetchAllRestaurants } from '../../api/ApiFetch';
import { Space, Select } from '@mantine/core';
import { IconSearch } from '@tabler/icons';

import { cities } from '../../api/foodData';

import './filterImagesModel.css';

const FilterImagesModel = ({
  setRestaurantUserPick,
  setCityPick,
  setDishTypePick,
  restaurantUserPick,
  cityPick,
  dishTypePick,
}) => {
  const [restaurantsList, setRestaurantsList] = useState([]);

  const styleSelect = {
    root: { margin: 'auto' },
    input: { '&::placeholder': { textAlign: 'center' } },
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await fetchAllRestaurants();
      sortRestaurants(res.data);
    };

    const sortRestaurants = (res) => {
      let arr = [];
      res.map((el) => {
        if (el.restaurantname) {
          arr.push({
            value: el._id,
            label: el.restaurantname,
            group: el.city,
          });
        }
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
          placeholder='Search By Restaurant ...'
          searchable
          clearable
          styles={styleSelect}
          value={restaurantUserPick}
        />

        <Space h='sm' />
        <Select
          icon={<IconSearch size={16} />}
          data={cities}
          onChange={setCityPick}
          placeholder='Search By City ...'
          searchable
          clearable
          styles={styleSelect}
          value={cityPick}
        />

        <Space h='sm' />
        {/* <Select
          icon={<IconSearch size={16} />}
          data={[
            { value: 'Breakfast', label: 'Breakfast' },
            { value: 'Lunch', label: 'Lunch' },
            { value: 'Dinner', label: 'Dinner' },
          ]}
          onChange={setDishTypePick}
          placeholder='Search By Dish Type ...'
          searchable
          clearable
          styles={styleSelect}
          value={dishTypePick}
        /> */}
      </form>
    </>
  );
};

export default FilterImagesModel;
