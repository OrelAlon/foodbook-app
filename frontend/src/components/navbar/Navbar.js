import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import Food from "../../assets/food.png";

import "./navbar.css";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [leftTitle, setLeftTitle] = useState("");
  const [middleTitle, setMiddleTitle] = useState("");
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const location = useLocation();
  console.log("lookk " + window.location.pathname);

  // useEffect(() => {
  //   switch (location.pathname) {
  //     case "/":
  //       setLeftTitle("My Profilee");
  //       setMiddleTitle("Restaurants");
  //       break;
  //     case location.pathname.startsWith("/profile"):
  //       setLeftTitle("Feed");
  //       setMiddleTitle("Restaurants");
  //       break;
  //     case "/analytics":
  //       setLeftTitle("My Profile");
  //       setMiddleTitle("Restaurants");
  //       break;
  //     default:
  //       setLeftTitle("My Profile def");
  //       setMiddleTitle("Restaurants");
  //       break;
  //   }
  // }, [location.pathname]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();

    navigate("/login");
  };
  return (
    <nav className='app__navbar'>
      <Link to='/' style={{ textDecoration: "none" }}>
        <div className='app__navbar-logo'>
          <img src={Food} alt='' className='foodImg' />
          <span className='logo'>Foodbook</span>
        </div>
      </Link>

      <div className='app__navbar-login'>
        <Link to={`/profile/${user.username}`} className='p__opensans'>
          {leftTitle}
        </Link>
        <div />
        <Link to={`/Restaurants`} className='p__opensans'>
          {middleTitle}
        </Link>
        <div />
        <a className='p__opensans' onClick={handleLogout}>
          Log-Out
        </a>
      </div>
      <div className='app__navbar-smallscreen'>
        <GiHamburgerMenu
          color='goldenrod'
          fontSize={27}
          onClick={() => setToggleMenu(true)}
        />
        {toggleMenu && (
          <div className='app__navbar-smallscreen_overlay flex__center slide-bottom'>
            <MdOutlineRestaurantMenu
              fontSize={27}
              className='overlay__close'
              onClick={() => setToggleMenu(false)}
            />
            <ul className='app__navbar-smallscreen_links'>
              <li>
                <Link
                  className='auto'
                  to={`/profile/${user.username}`}
                  onClick={() => setToggleMenu(false)}
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  to={`/Restaurants`}
                  className='p__opensans auto'
                  onClick={() => setToggleMenu(false)}
                >
                  Restaurants
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  style={{ textDecoration: "none" }}
                  onClick={() => setToggleMenu(false)}
                >
                  Feed
                </Link>
              </li>
              <li>
                <a href='#contact' onClick={() => setToggleMenu(false)}>
                  Contact Us
                </a>
              </li>
              <li onClick={handleLogout}>
                <a href='#contact' onClick={() => setToggleMenu(false)}>
                  Log-Out
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
