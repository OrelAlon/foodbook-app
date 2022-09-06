import { useNavigate } from "react-router-dom";

import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div>
      {" "}
      <div className='login'>
        <h2 className='active'> sign in </h2>

        <h2 className='nonactive' onClick={() => navigate("/register")}>
          {" "}
          sign up{" "}
        </h2>
        <form>
          <div className='input-div'>
            <p>email:</p>
            <input type='email' className='text' name='email'></input>
          </div>

          <div className='input-div'>
            <p>password:</p>
            <input type='password' className='text' name='password'></input>
          </div>
          <button className='signin'>Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
