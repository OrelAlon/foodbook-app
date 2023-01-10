import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import GoogleLogin from "react-google-login";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import { gapi } from "gapi-script";
import "./test.css";
import foodbook from "../assets/foodbook.png";

const Test = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login, googleLogin } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      navigate("/");
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  const handleGoogleLogin = async (response) => {
    try {
      await googleLogin({
        response,
      });
      navigate("/");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const responseGoogle = (response) => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        plugin_name: "chat",
      });
    });
    handleGoogleLogin(response);
  };

  return (
    <div>
      <div className='login-page center-div'>
        <div id='login_div'>
          <div className='top_section'>
            <div className='form_heading'>
              <img width='170vw' height='50vh' src={foodbook} alt='' />{" "}
            </div>
            <form action='#' method='post'>
              <input type='text' name='' id='' placeholder='Email' />
              <input type='text' name='' id='' placeholder='Password' />

              <input type='submit' value='Log in' name='' id='' />
              <div id='divide_form'>
                <span className='divide_line' id='left_divide_line'></span>
                <div className='or_text'>OR</div>
              </div>
              <div className='lower_div'>
                <i className='fab fa-facebook-square fa-lg'></i>
                <span>Log in with Google</span>
              </div>
              <p className='forgot_password'>Forgot password?</p>
            </form>
          </div>
          <div>
            <div className='bottom_section'>
              Don't have an account? <span>Sign up</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p>&copy;2023 Orel Alon from Home</p>
      </div>
    </div>
  );
};

export default Test;

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
          <button className='signinBtn transform'>Sign In</button>
          <ToastContainer />
        </form>
        <div className='google-login transform'>
          {/* <GoogleOAuthProvider> */}
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText='Login with Google'
            onSuccess={responseGoogle}
          />
          {/* </GoogleOAuthProvider> */}
        </div>
      </div>
    </div>
  );
};
