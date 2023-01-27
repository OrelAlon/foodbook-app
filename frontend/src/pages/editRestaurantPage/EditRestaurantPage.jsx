import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

import { fetchRestaurantData } from "../../api/ApiFetch";
import { submitHandlerEditRestaurant } from "../../api/ApiPutHandler";

import NavBar from "../../components/navBar/NavBar";
import ImageDisplay from "../../components/imageDisplay/ImageDisplay";

import { cities } from "../../api/foodData";
import { IconPhotoPlus } from "@tabler/icons";
import { Loader, Select } from "@mantine/core";

import "../editProfileUserPage/editProfileUserPage.css";

const EditRestaurantPage = () => {
  const navigate = useNavigate();
  const restaurantnameParams = useParams().restaurantname;

  // Declare state variables for storing form data
  const [restaurant, setRestaurant] = useState([]);
  const [restaurantName, setRestaurantName] = useState(restaurantnameParams);
  const [restaurantCity, setRestaurantCity] = useState();
  const [restaurantInstagram, setRestaurantInstagram] = useState("");
  const [file, setFile] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // e handler for submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Save the form data to the database here
    await submitHandlerEditRestaurant(
      file,
      restaurantName,
      restaurantCity,
      restaurantInstagram,
      restaurant,
      setLoading
    );
    try {
      navigate("/restaurants");
    } catch (error) {
      setErrorMsg(error.response.data.error);
    }
  };

  const fetchRestaurant = async () => {
    const res = await fetchRestaurantData(restaurantnameParams);

    setRestaurant(res.data);
  };

  useEffect(() => {
    fetchRestaurant();
  }, [restaurantnameParams]);

  // Render the form
  return (
    <>
      <NavBar />
      <form className='profile-edit-form' onSubmit={handleSubmit}>
        <label className='profile-edit-form__label'>
          Name:
          <input
            className='profile-edit-form__input'
            type='text'
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value.trim())}
          />
        </label>
        <br />
        <label className='profile-edit-form__label'>City:</label>
        <Select
          data={cities}
          onChange={setRestaurantCity}
          style={{ width: "100%", margin: "auto", color: "dark.9" }}
          searchable
        />{" "}
        <br />
        <label className='profile-edit-form__label'>
          Instagram Link:
          <input
            className='profile-edit-form__input'
            type='text'
            value={restaurantInstagram}
            onChange={(e) => setRestaurantInstagram(e.target.value)}
          />
        </label>
        <br />
        <label
          className='profile-edit-form__label'
          onChange={(e) => setFile(e.target.files[0])}
        >
          Image:
          <div className='upload-image-div'>
            <label htmlFor='file' className='shareOption'>
              <IconPhotoPlus size={30} color={file ? "green" : "red"} />
              <input
                style={{ display: "none" }}
                type='file'
                id='file'
                accept='.png,.jpeg,.jpg,.jfif'
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            {file && (
              <div className='img-upload'>
                <ImageDisplay file={file} setFile={setFile} />
              </div>
            )}
          </div>
        </label>
        <br />
        {errorMsg && <div className='error msg'>{errorMsg}</div>}
        <div className='center-div'>{loading && <Loader />}</div>
        <button className='profile-edit-form__button' type='submit'>
          Save
        </button>
      </form>
    </>
  );
};

export default EditRestaurantPage;
