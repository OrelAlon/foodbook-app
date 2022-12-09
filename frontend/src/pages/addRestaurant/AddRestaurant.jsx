import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import "./addRestaurant.css";

const AddRestaurant = () => {
  const [file, setFile] = useState(null);
  const restaurantnameRef = useRef();
  const cityRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.set("profilePicture", file);
      data.set("restaurantname", restaurantnameRef.current.value);
      data.set("city", cityRef.current.value);
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
          <label htmlFor='file'>City</label>
          <input placeholder='City' type='string' ref={cityRef} />

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
