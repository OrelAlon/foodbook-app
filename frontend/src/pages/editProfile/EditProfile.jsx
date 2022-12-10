import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";
import axios from "axios";

import "./editProfile.css";

const EditProfile = () => {
  const [file, setFile] = useState(null);
  const [picMessage, setPicMessage] = useState();
  const [user, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const navigate = useNavigate();

  useEffect(() => {
    // const fetchRestaurants = async () => {
    //   const res = await axios.get(`/api/restaurants/restaurants`);
    //   setRestaurants(res.data);
    // };
    // fetchRestaurants();
  }, []);

  const postDetails = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.set("profilePicture", file);
      data.set("userId", user._id);
      await axios.put("/api/users/" + user._id, data);
      localStorage.setItem("user", JSON.stringify(user));
      try {
        window.location.reload(false);

        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //       .then((res) => res.json())
  //       .then((data) => {
  //         setPic(data.url.toString());
  //         console.log(pic);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     return setPicMessage("Please Select an Image");
  //   }
  // };

  return (
    <>
      <Navbar />
      <div className='edit_profile'>
        <h1>Edit Profile</h1>
        <form method='post' className='black_font' onSubmit={postDetails}>
          <ul>
            <li>
              <label htmlFor='name'>Name:</label>
              <input type='text' id='name' name='user_name' />
            </li>
            <li>
              <label htmlFor='mail'>E-mail:</label>
              <input type='email' id='mail' name='user_email' />
            </li>
            <li>
              <label htmlFor='mail'>Password:</label>
              <input type='email' id='mail' name='user_email' />
            </li>
            <li>
              <label htmlFor='mail'>Confirm Password:</label>
              <input type='email' id='mail' name='user_email' />
            </li>
            <li>
              <label htmlFor='file'>Change Profile Image:</label>

              <input
                required
                // style={}
                type='file'
                name='file'
                id='file'
                accept='.png,.jpeg,.jpg,.jfif'
                onChange={(e) => setFile(e.target.files[0])}
              />
            </li>
            {picMessage && <p>{picMessage}</p>}
            <li className='button'>
              <button type='submit'>Save</button>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
