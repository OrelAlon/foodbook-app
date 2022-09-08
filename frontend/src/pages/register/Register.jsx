import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./register.css";

const Register = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordAgainRef = useRef();

  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(usernameRef.current.value);
    console.log(usernameRef.current);
    console.log(usernameRef);
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
        <form onSubmit={handleSubmit}>
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
              <span className='shareOptionText'>Add Profile Photo</span>
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
          <button className='signin'>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
