import { useState } from "react";

import { Input, Select, Space, Button } from "@mantine/core";
import { cities } from "../../assets/foodData";

function ShortcutAddRestaurant({ setAddRestShortcut, addRestShortcut }) {
  const [restaurantName, setRestaurantName] = useState("");
  const [city, setCity] = useState("");

  const handleSaveRest = () => {
    setAddRestShortcut(!addRestShortcut);
  };

  return (
    <div>
      <Input
        style={{ width: "85%", margin: "auto", color: "dark.9" }}
        placeholder='Restaurant Name'
        onChange={(e) => setRestaurantName(e.target.value)}
        value={restaurantName}
        type='text'
        required
      />
      <Space h='xs' />
      <Select
        data={cities}
        onChange={setCity}
        placeholder='city'
        style={{ width: "85%", margin: "auto", color: "dark.9" }}
        required
      />{" "}
      <Space h='xs' />
      <div className='share-btn-div'>
        <Button size='xs' style={{ margin: "auto" }} onClick={handleSaveRest}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default ShortcutAddRestaurant;
