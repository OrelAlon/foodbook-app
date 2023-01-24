import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Loader } from "@mantine/core";
import ImageUpload from "../../components/imageUpload/ImageUpload";

import axios from "axios";

import foodbook from "../../assets/foodbook.png";
import { IconPhotoPlus } from "@tabler/icons";

const Register = () => {
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    if (file == null) {
      setLoading(false);
      setErrorMsg("Please upload a profile image");
      return;
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setLoading(false);

      return setErrorMsg("Password don't match...");
    }
    try {
      const data = new FormData();
      data.set("profilePicture", file);
      data.set("username", usernameRef.current.value);
      data.set("email", emailRef.current.value);
      data.set("password", passwordRef.current.value);
      await axios.post("/api/auth/register", data);
      await login({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      navigate("/");
    } catch (error) {
      setLoading(false);
      setErrorMsg(error.response.data.message);
    }
  };

  return (
    <div>
      <div className='login-page'>
        <div className='login_div'>
          <div className='top_section'>
            <div className='form_heading'>
              <img className='foodbook-img' src={foodbook} alt='' />{" "}
            </div>
            <form onSubmit={handleSubmitRegister} encType='multipart/form-data'>
              <div className='input-div'>
                {" "}
                <input
                  className='login-input'
                  placeholder='User Name'
                  name='username'
                  type='text'
                  ref={usernameRef}
                />
                <br />
                <input
                  className='login-input'
                  placeholder='Email'
                  type='email'
                  name='email'
                  ref={emailRef}
                  required
                />
                <br />
                <input
                  className='login-input'
                  placeholder='Password'
                  type='password'
                  name='password'
                  ref={passwordRef}
                  required
                  minLength='6'
                />
                <br />
                <input
                  className='login-input'
                  placeholder='Confirm Password'
                  type='password'
                  name='password'
                  ref={confirmPasswordRef}
                  required
                  minLength='6'
                />
              </div>
              <div className='shareOptions transform share-div center-div'>
                <label htmlFor='file' className='shareOption '>
                  <IconPhotoPlus size={26} color={file ? "green" : "red"} />
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
              <div className='transform'>
                <h1 className='center-div errMsg'>{errorMsg}</h1>
                <div className='center-div loading'>
                  {loading && <Loader />}
                </div>
                <button className='login-btn' type='submit'>
                  Sign Up
                </button>
              </div>
              <div id='divide_form'>
                <span className='divide_line' id='left_divide_line'></span>
              </div>
              <div className='lower_div '></div>
            </form>
          </div>
          <div>
            <div className='bottom_section transform'>
              Already have an account?{" "}
              <span onClick={() => navigate("/login")}>Sign In</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
