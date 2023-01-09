import { Link } from "react-router-dom";

import foodbook from "../../assets/foodbook.jpeg";

import "../../App.css";

function Logo() {
  return (
    <>
      <Link to='/' style={{ textDecoration: "none" }}>
        <img className='logo' src={foodbook} alt='foodbook' />
      </Link>
    </>
  );
}

export default Logo;
