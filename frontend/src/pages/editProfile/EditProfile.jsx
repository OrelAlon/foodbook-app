import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";
import axios from "axios";

import "./editProfile.css";

const EditProfile = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [test, setTest] = useState("test work");
  const [file, setFile] = useState(null);
  const [picMessage, setPicMessage] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  const [user, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const navigate = useNavigate();

  useEffect(() => {
    console.log("k");
  }, []);

  const postDetails = async (e) => {
    e.preventDefault();

    setErrorMsg("");
    try {
      const data = new FormData();
      data.set("profilePicture", file);
      data.append("profilePicture", test);
      data.set("userId", user._id);
      await axios.put("/api/users/" + user._id, data);
      localStorage.setItem("user", JSON.stringify(user));
      try {
        localStorage.clear();

        navigate("/login");
        window.location.reload(true);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className='edit_profile'>
        <h1>Edit Profile</h1>
        <form method='post' className='black_font' onSubmit={postDetails}>
          <ul>
            {/* <li>
              <label htmlFor='name'>Name:</label>
              <input type='text' id='name' ref={usernameRef} name='user_name' />
            </li>
            <li>
              <label htmlFor='mail'>E-mail:</label>
              <input type='email' id='mail' ref={emailRef} name='user_email' />
            </li>
            <li>
              <label htmlFor='mail'>Password:</label>
              <input
                type='email'
                id='mail'
                ref={passwordRef}
                name='user_email'
              />
            </li>
            <li>
              <label htmlFor='mail'>Confirm Password:</label>
              <input
                type='email'
                id='mail'
                ref={confirmPasswordRef}
                name='user_email'
              />
            </li> */}
            <li>
              <label htmlFor='file'>Change Profile Image:</label>

              <input
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
