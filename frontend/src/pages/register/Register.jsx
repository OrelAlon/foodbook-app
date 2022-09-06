import { useNavigate } from "react-router-dom";

import "./register.css";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div>
      {" "}
      <div className='login'>
        <h2 className='nonactive' onClick={() => navigate("/login")}>
          {" "}
          sign in{" "}
        </h2>

        <h2 className='active'> sign up </h2>
        <form>
          <div className='input-div'>
            <p>email:</p>
            <input type='text' className='text' name='username'></input>
          </div>

          <div className='input-div'>
            <p>password:</p>
            <input type='password' className='text' name='password'></input>
          </div>
          <button className='signin'>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
