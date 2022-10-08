import { useEffect } from "react";
import { useState } from "react";
import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import "./login.css";

const Login = () => {
  const [error, setError] = useState(null);
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("login");
    console.log(error);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div>
      {" "}
      <div className='login'>
        <h2 className='active'> sign in </h2>

        <h2 className='nonactive' onClick={() => navigate("/register")}>
          {" "}
          sign up{" "}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='input-div'>
            <p>email:</p>
            <input
              type='email'
              ref={emailRef}
              className='text'
              name='email'
            ></input>
          </div>

          <div className='input-div'>
            <p>password:</p>
            <input
              type='password'
              ref={passwordRef}
              className='text'
              name='password'
            ></input>
          </div>
          <button className='signin'>Sign In</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
