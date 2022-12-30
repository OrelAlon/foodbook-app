import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

import axios from "axios";

import ImageUpload from "../../components/imageUpload/ImageUpload";
import NavMenu from "../../components/navMenu/NavMenu";
import ShareImageModal from "../../components/shareImageModal/ShareImageModal";
import ChangePasswordModel from "../../components/changePasswordModel/ChangePasswordModel";
import Logo from "../../components/logo/Logo";
import { BiImage } from "react-icons/bi";
import { Loader } from "@mantine/core";

import "../editProfileUserPage/editProfileUserPage.css";

const EditRestaurantPage = () => {
  const [shareImageOpened, setShareImageOpened] = useState(false);
  const [changePasswordModel, setChangePasswordOpened] = useState(false);

  const navigate = useNavigate();
  const restaurantname = useParams().restaurantname;
  // Declare state variables for storing form data
  const [restaurant, setRestaurant] = useState([]);

  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantInstagram, setRestaurantInstagram] = useState("");
  const [file, setFile] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // e handler for submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Save the form data to the database here
    try {
      setLoading(true);

      const data = new FormData();
      if (file) {
        console.log("444");
        data.set("profilePicture", file);
      }
      data.set("restaurantname", restaurantName);
      data.set("instagram", restaurantInstagram);

      data.set("restaurantId", restaurant._id);

      await axios.put("/api/restaurants/" + restaurant._id, data);

      try {
        // window.location.reload(false);
        navigate("/restaurants");
      } catch (error) {
        setErrorMsg(error.response.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRestaurant = async () => {
    const res = await axios.get(
      `/api/restaurants/?restaurantname=${restaurantname}`
    );
    setRestaurant(res.data);
  };

  useEffect(() => {
    fetchRestaurant();
  }, [restaurantname]);

  // Render the form
  return (
    <>
      <Logo />
      <div className='menu-div'>
        {" "}
        <button
          onClick={() => setShareImageOpened(true)}
          className='add-image-btn'
        >
          📷
        </button>
        <NavMenu />
        <ShareImageModal
          shareImageOpened={shareImageOpened}
          setShareImageOpened={setShareImageOpened}
        />
      </div>
      <form className='profile-edit-form' onSubmit={handleSubmit}>
        <label className='profile-edit-form__label'>
          Name:
          <input
            className='profile-edit-form__input'
            type='text'
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
          />
        </label>
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
        {/* <label className='profile-edit-form__label'>
          Email:
          <input
            className='profile-edit-form__input'
            type='email'
            value={restaurantEmail}
            onChange={(e) => setRestaurantEmail(e.target.value)}
          />
        </label> */}
        <br />
        <label
          className='profile-edit-form__label'
          onChange={(e) => setFile(e.target.files[0])}
        >
          Image:
          <div className='upload-image-div'>
            <label htmlFor='file' className='shareOption'>
              {/* <span className='shareText'>Upload</span> */}
              <BiImage fontSize={36} color={file ? "green" : "red"} />
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
                <ImageUpload file={file} setFile={setFile} />
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
      <div
        className='change-password-div'
        onClick={() => setChangePasswordOpened(true)}
      >
        {" "}
        <a>Change password</a>
        <ChangePasswordModel
          changePasswordModel={changePasswordModel}
          setChangePasswordOpened={setChangePasswordOpened}
        />
      </div>
    </>
  );
};

export default EditRestaurantPage;
