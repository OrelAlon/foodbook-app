import { useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import Food from "../../assets/food.png";
import "./navbar.css";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <nav className='app__navbar'>
      <div className='app__navbar-logo'>
        <img src={Food} alt='' className='foodImg' />
        <span className='logo'>Foodbook</span>
      </div>
      {/* <ul className='app__navbar-links'>
        <li className='p__opensans'>
          <a href='#home'>Home</a>
        </li>
        <li className='p__opensans'>
          <a href='#about'>About</a>
        </li>
        <li className='p__opensans'>
          <a href='#menu'>Menu</a>
        </li>
        <li className='p__opensans'>
          <a href='#awards'>Awards</a>
        </li>
        <li className='p__opensans'>
          <a href='#contact'>Contact</a>
        </li>
      </ul> */}
      <div className='app__navbar-login'>
        <a href='#login' className='p__opensans'>
          Log-Out
        </a>
        <div />
        <a href='/' className='p__opensans'>
          My Profile
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
                <a href='#home' onClick={() => setToggleMenu(false)}>
                  Home
                </a>
              </li>
              <li>
                <a href='#about' onClick={() => setToggleMenu(false)}>
                  About
                </a>
              </li>
              <li>
                <a href='#menu' onClick={() => setToggleMenu(false)}>
                  Menu
                </a>
              </li>
              <li>
                <a href='#awards' onClick={() => setToggleMenu(false)}>
                  Awards
                </a>
              </li>
              <li>
                <a href='#contact' onClick={() => setToggleMenu(false)}>
                  Contact
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
