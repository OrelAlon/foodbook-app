import { Link } from "react-router-dom";

import "../../App.css";

function Logo() {
  return (
    <>
      <Link to='/' style={{ textDecoration: "none" }}>
        <p className='logo'>Foodbook</p>
      </Link>
    </>
  );
}

export default Logo;
