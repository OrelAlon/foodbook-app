import { useState } from "react";

import "./editProfileUserPage.css";

// this page was build with ChatGPT :)
const EditProfileUserPage = () => {
  // Declare state variables for storing form data
  const [UserName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userInstagram, setUserInstagram] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [file, setFile] = useState(null);

  // e handler for submitting the form
  const handleSubmit = (e) => {
    e.preDefault();
    // Save the form data to the database here
  };

  // e handler for file input
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Render the form
  return (
    <form className='profile-edit-form' onSubmit={handleSubmit}>
      <label className='profile-edit-form__label'>
        Name:
        <input
          className='profile-edit-form__input'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label className='profile-edit-form__label'>
        Phone:
        <input
          className='profile-edit-form__input'
          type='text'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <br />
      <label className='profile-edit-form__label'>
        Instagram Link:
        <input
          className='profile-edit-form__input'
          type='text'
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
      </label>
      <br />
      <label className='profile-edit-form__label'>
        Email:
        <input
          className='profile-edit-form__input'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label className='profile-edit-form__label'>
        Image:
        <input
          className='profile-edit-form__input'
          type='file'
          onChange={handleFileChange}
        />
      </label>
      <br />
      <button className='profile-edit-form__button' type='submit'>
        Save
      </button>
    </form>
  );
};

export default EditProfileUserPage;
