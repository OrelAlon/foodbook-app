import { useState } from "react";

import { Input, Select, Space, Button } from "@mantine/core";
import { cities } from "../../assets/foodData";
import axios from "axios";

function ShortcutAddRestaurant({
  setAddRestShortcut,
  addRestShortcut,
  setRestaurantUserPick,
}) {
  const [restaurantName, setRestaurantName] = useState("");
  const [city, setCity] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSaveRest = async () => {
    if (restaurantName == null) {
      return setErrorMsg("Please choose a restaurant");
    }
    if (city == null) {
      return setErrorMsg("Please choose a city");
    }
    try {
      setErrorMsg("");
      const data = new FormData();
      data.set("restaurantname", restaurantName);
      data.set("city", city);
      await axios.post("/api/restaurants/temprest", data);
      setRestaurantUserPick(restaurantName);
      setAddRestShortcut(!addRestShortcut);
    } catch (error) {
      setErrorMsg(error.response.data.error);
    }
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
      {errorMsg && <div className='error msg'>{errorMsg}</div>}
      <div className='share-btn-div'>
        <Button size='xs' style={{ margin: "auto" }} onClick={handleSaveRest}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default ShortcutAddRestaurant;
