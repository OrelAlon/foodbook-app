import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ImageUpload from "../../components/imageUpload/ImageUpload";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";

import { BiImage } from "react-icons/bi";

import "./editProfile.css";

const EditProfile = () => {
  // const usernameRef = useRef();
  // const emailRef = useRef();
  // const passwordRef = useRef();
  // const confirmPasswordRef = useRef();

  const [file, setFile] = useState(null);
  const [picMessage, setPicMessage] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [updateUser, setUpdateUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    console.log("updateUser");
    console.log(updateUser);
  }, [updateUser]);

  const postDetails = async (e) => {
    e.preventDefault();

    setErrorMsg("");
    try {
      const data = new FormData();

      data.set("profilePicture", file);
      data.set("userId", currentUser._id);

      await axios.put("/api/users/" + currentUser._id, data);
      try {
        const res = await axios.get(`/api/users/?userId=${currentUser._id}`);
        await localStorage.setItem("user", JSON.stringify(res.data));
        window.location.reload(true);

        navigate("/");
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
              <div className='shareOptions'>
                <label htmlFor='file' className='shareOption'>
                  <span className='shareText'>Upload</span>
                  <BiImage fontSize={22} color={file ? "green" : "red"} />
                  <input
                    style={{ display: "none" }}
                    type='file'
                    id='file'
                    accept='.png,.jpeg,.jpg,.jfif'
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </label>

                {file && (
                  <ImageUpload
                    className={"register-image"}
                    file={file}
                    setFile={setFile}
                  />
                )}
              </div>
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

// {_id: '63931ce478ba61e01dbf2a1b', username: 'ran', email: 'ran@gmail.com', password: '$2b$10$kzIPSI.kcsdFpRQN8bHaCexjqTvEtygLBwf0MWiN5.rux1q7PUiji', profilePicture: 'https://res.cloudinary.com/dlml6omng/image/upload/v1670851003/avatars/vrdkkhqygndqrnxdlqam.png', …}
