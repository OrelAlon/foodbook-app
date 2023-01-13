import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import axios from "axios";

import NavBar from "../../components/navBar/NavBar";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import ChangePasswordModel from "../../components/changePasswordModel/ChangePasswordModel";

import { BiImage } from "react-icons/bi";
import { Loader } from "@mantine/core";

import "./editProfileUserPage.css";

// this page was partially built with ChatGPT :)
const EditProfileUserPage = () => {
  const [changePasswordModel, setChangePasswordOpened] = useState(false);

  const { user: currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Declare state variables for storing form data
  const [userName, setUserName] = useState(currentUser.username);
  const [userInstagram, setUserInstagram] = useState(currentUser.instagram);
  const [userEmail, setUserEmail] = useState(currentUser.email);
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
        data.set("profilePicture", file);
      }
      data.set("username", userName);
      data.set("instagram", userInstagram);
      data.set("email", userEmail);
      data.set("userId", currentUser._id);

      await axios.put("/api/users/" + currentUser._id, data);

      try {
        const existingUser = await axios.get(
          `/api/users/?userId=${currentUser._id}`
        );
        // save the updated user back to the local storage
        localStorage.setItem("user", JSON.stringify(existingUser.data));

        // window.location.reload(false);
        navigate("/");
      } catch (error) {
        setErrorMsg(error.response.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <br />

        <label className='profile-edit-form__label'>
          Instagram Link:
          <input
            className='profile-edit-form__input'
            type='text'
            value={userInstagram}
            onChange={(e) => setUserInstagram(e.target.value)}
          />
        </label>
        <br />
        <label className='profile-edit-form__label'>
          Email:
          <input
            className='profile-edit-form__input'
            type='email'
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
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

export default EditProfileUserPage;
