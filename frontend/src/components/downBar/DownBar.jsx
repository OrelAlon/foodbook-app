import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import noAvatar from "../../assets/noAvatar.png";
import {
  IconHome,
  IconToolsKitchen2,
  IconGridDots,
  IconInfoSquare,
  IconPhoto,
} from "@tabler/icons";

const DownBar = () => {
  const { user: currentUser } = useContext(AuthContext);
  const { username = "default", profilePicture = noAvatar } = currentUser;

  const style = { textDecoration: "none" };

  return (
    <>
      <div className='menu-div-down transform'>
        <div className='btn-downbar transform'>
          <Link to={`/`} style={{ textDecoration: "none" }}>
            <IconHome />
          </Link>
        </div>
        <div className='btn-downbar transform'>
          <Link to={`/restaurants`} style={style}>
            <IconToolsKitchen2 />
          </Link>
        </div>
        <div className='btn-downbar transform'>
          {/* <IconGridDots /> */}
          <IconPhoto />
        </div>
        <div className='btn-downbar transform'>
          <Link to={`/about`} style={style}>
            <IconInfoSquare />
          </Link>
        </div>
        <div className='btn-downbar transform'>
          <Link to={`/profile/${username}`}>
            <img className='profile-img-downbar' src={profilePicture} alt='' />
          </Link>
        </div>
      </div>
    </>
  );
};
export default DownBar;
