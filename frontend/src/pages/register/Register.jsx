import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import "./register.css";

const Register = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordAgainRef = useRef();

  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordAgainRef.current.value) {
      return setErrorMsg("Password don't match...");
    } else {
      setErrorMsg("");
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
            <p>password again:</p>
            <input
              type='password'
              ref={passwordAgainRef}
              className='text'
              name='password'
              required
              minLength='6'
            ></input>
          </div>
          <div className='imgLog'>
            {/* http://jsfiddle.net/4cwpLvae/ */}
            <label htmlFor='file' className='loginImg'>
              <div className='shareOptionText'>Add Profile Photo</div>
              <input
                required
                style={{ display: "none" }}
                type='file'
                name='file'
                id='file'
                accept='.png,.jpeg,.jpg,.jfif'
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
          <h1 className='errMsg'>{errorMsg}</h1>
          <button className='signinBtn'>Sign Up</button>
          {/* <ToastContainer /> */}
        </form>
      </div>
    </div>
  );
};

export default Register;
