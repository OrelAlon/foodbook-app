import React from "react";

import "./editProfile.css";

const EditProfile = () => {
  return (
    <div className='edit_profile'>
      <h1>Edit Profile</h1>
      <form method='post' className='black_font'>
        <ul>
          <li>
            <label for='name'>Name:</label>
            <input type='text' id='name' name='user_name' />
          </li>
          <li>
            <label for='mail'>E-mail:</label>
            <input type='email' id='mail' name='user_email' />
          </li>
          <li>
            <label for='mail'>Password:</label>
            <input type='email' id='mail' name='user_email' />
          </li>
          <li>
            <label for='mail'>Confirm Password:</label>
            <input type='email' id='mail' name='user_email' />
          </li>
          <li class='button'>
            <button type='submit'>Save</button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default EditProfile;
