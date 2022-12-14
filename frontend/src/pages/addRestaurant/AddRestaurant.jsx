import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select, Space } from "@mantine/core";

import axios from "axios";
import "./addRestaurant.css";

import { cities } from "../../assets/foodData";

const AddRestaurant = () => {
  const [file, setFile] = useState(null);
  const [city, setCity] = useState(null);
  const restaurantnameRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.set("profilePicture", file);
      data.set("restaurantname", restaurantnameRef.current.value);
      data.set("city", city);
      await axios.post("/api/restaurants/", data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* // <TopBar /> */}
      <div className='addRestaurant'>
        <form action='submit' className='formBox' onSubmit={handleSubmit}>
          <label htmlFor='file'>Add Restaurant Name</label>
          <input
            placeholder='Restaurant Name'
            type='string'
            required
            ref={restaurantnameRef}
          />
          <Select
            data={cities}
            onChange={setCity}
            label='City:'
            placeholder='Which City?'
            searchable
            style={{ width: "70%", margin: "auto" }}
          />
          <Space h='sm' />

          <div className='imgLog'>
            <label htmlFor='file' className='loginImg'>
              <div className='shareOptionText'>Add Image</div>
              <input
                required
                style={{ display: "none" }}
                type='file'
                name='file'
                id='file'
                accept='.png,.jpeg,.jpg,.jfif'
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
          <button className='saveButton' type='submit'>
            Save Restaurant
          </button>
        </form>
      </div>
    </>
  );
};

export default AddRestaurant;
