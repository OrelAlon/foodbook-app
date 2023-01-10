import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "@mantine/core";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import { BiImage } from "react-icons/bi";

import axios from "axios";

import "./register.css";
const Register = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file == null) {
      setErrorMsg("Please upload a profile image");
      return;
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setErrorMsg("Password don't match...");
    } else {
      setErrorMsg("");
      setLoading(true);

      try {
        const data = new FormData();
        data.set("profilePicture", file);
        data.set("username", usernameRef.current.value);
        data.set("email", emailRef.current.value);
        data.set("password", passwordRef.current.value);
        await axios.post("/api/auth/register", data);

        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      {" "}
      <div className='register'>
        <h2 className='nonactive' onClick={() => navigate("/login")}>
          {" "}
          sign in{" "}
        </h2>

        <h2 className='active'> sign up </h2>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className='input-div'>
            <p>username:</p>
            <input
              type='text'
              ref={usernameRef}
              className='text'
              name='username'
              required
            ></input>
          </div>
          <div className='input-div'>
            <p>email:</p>
            <input
              type='email'
              ref={emailRef}
              className='text'
              name='email'
              required
            ></input>
          </div>

          <div className='input-div'>
            <p>password:</p>
            <input
              type='password'
              ref={passwordRef}
              className='text'
              name='password'
              required
              minLength='6'
            ></input>
          </div>
          <div className='input-div'>
            <p>Confirm Password:</p>
            <input
              type='password'
              ref={confirmPasswordRef}
              className='text'
              name='password'
              required
              minLength='6'
            ></input>
          </div>
          <div className='shareOptions transform share-div center-div'>
            <label htmlFor='file' className='shareOption '>
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
          <h1 className='errMsg'>{errorMsg}</h1>
          <div className='center-div'>{loading && <Loader />}</div>

          <button className='signinRegister transform'>Sign Up</button>
          {/* <ToastContainer /> */}
        </form>
      </div>
    </div>
  );
};

export default Register;
