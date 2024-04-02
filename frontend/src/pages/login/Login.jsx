import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Loader } from '@mantine/core';
// import GoogleLogin from "react-google-login";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import foodbook from '../../assets/foodbook.png';
import { gapi } from 'gapi-script';

import './login.css';

const Login = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const { login, googleLogin } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg('');
      setLoading(true);

      await login({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      navigate('/');
    } catch (error) {
      setLoading(false);
      setErrorMsg(error.response.data);
    }
  };
  const handleGoogleLogin = async (response) => {
    try {
      setLoading(true);

      await googleLogin({
        response,
      });
      navigate('/');
    } catch (error) {
      setLoading(false);
      setErrorMsg(error.response.data);
      console.error('Google Login Error:', error);
    }
  };

  // const responseGoogle = (response) => {
  //   gapi.load("client:auth2", () => {
  //     gapi.client.init({
  //       clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  //       plugin_name: "chat",
  //     });
  //   });
  //   handleGoogleLogin(response);
  // };
  const [visible, setVisible] = useState(false)


  return (
    <div className='login-page'>
      <div className='login_div'>
        <div className='top_section'>
          <div className='form_heading'>
            <img className='foodbook-img' src={foodbook} alt='' />{' '}
          </div>
          <form onSubmit={handleSubmitLogin} className='login-form'>
            <div className='input-div'>
              {' '}
              <input
                className='login-input'
                placeholder='Email'
                type='email'
                ref={emailRef}
              />
              <br />
              <input
                className='login-input'
                placeholder='Password'
                type='password'
                ref={passwordRef}
              />
            </div>
            <div className='transform'>
              <button
                className='login-btn'
                type='submit'
                onClick={handleSubmitLogin}
              >
                Log in
              </button>
              <h1 className='errMsg center-div'>{errorMsg}</h1>
              <div className='center-div loading' style={{ margin: 'auto' }}>
                {loading && <Loader />}
              </div>
            </div>
            <div id='divide_form'>
              <span className='divide_line' id='left_divide_line'></span>
              <div className='or-text'>
                <span>OR</span>
              </div>
            </div>
            <div className='lower_div'>
              <div className='google-login transform' id="google-login-div" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>

                <div style={{ visibility: visible ? 'visible' : 'hidden' }} className='tooltip'>Log in with google</div>
                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                  <GoogleLogin
                    type={'icon'}
                    shape={'circle'}
                    width={325}
                    buttonText='Login with Google'
                    onSuccess={handleGoogleLogin}
                  />
                </GoogleOAuthProvider>

              </div>
            </div>
            <p className='forgot_password transform'>Forgot password?</p>
          </form>
        </div>
        {/* <div> */}
        <div className='bottom_section transform'>
          Don't have an account?{' '}
          <span onClick={() => navigate('/register')}>Sign up</span>
        </div>
        {/* </div> */}
        <div className='bottom_ transform'>
          © 2023 - <span onClick={() => navigate('/about')}>About</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
