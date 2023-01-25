import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import axios from "axios";
import { submitHandlerEditUser } from "../../api/ApiPutHandler";

import NavBar from "../../components/navBar/NavBar";
import ImageUpload from "../../components/imageDisplay/ImageDisplay";
import ChangePasswordModel from "../../components/changePasswordModel/ChangePasswordModel";

import { IconPhotoPlus } from "@tabler/icons";
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
    submitHandlerEditUser(
      file,
      userName,
      userInstagram,
      userEmail,
      currentUser,
      setLoading,
      setErrorMsg
    );
    navigate("/");
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
          Email:
          <input
            className='profile-edit-form__input'
            type='email'
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </label>
        <br />{" "}
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
        <label
          className='profile-edit-form__label'
          onChange={(e) => setFile(e.target.files[0])}
        >
          Image:
          <div className='upload-image-div'>
            <label htmlFor='file' className='shareOption'>
              {/* <span className='shareText'>Upload</span> */}
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
