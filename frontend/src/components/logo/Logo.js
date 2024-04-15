import React from "react";

import { Link } from "react-router-dom";

import foodbook from "../../assets/foodbook.png";

import "../../App.scss";

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
