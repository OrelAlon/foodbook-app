import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";

import "./login.css";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      await loginCall(
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        dispatch
      );
      navigate("/");
    } catch (error) {
      console.log(error);
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
        </form>
      </div>
    </div>
  );
};

export default Login;
