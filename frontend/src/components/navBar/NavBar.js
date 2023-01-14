import React, { useState } from "react";
import { useLocation } from "react-router";

import ShareImageModal from "../shareImageModal/ShareImageModal";
import NavMenu from "../navMenu/NavMenu";
import Logo from "../logo/Logo";
import logoTran from "../../assets/transparent.png";
import grid from "../../assets/grid.svg";

const NavBar = ({ setShowGrid, showGrid }) => {
  const [shareImageOpened, setShareImageOpened] = useState(false);
  const location = useLocation();

  return (
    <>
      <div className='transform' onClick={() => window.location.reload(false)}>
        <Logo />
      </div>

      <div className='menu-div transform'>
        {location.pathname === "/" && (
          <button
            onClick={() => setShowGrid(!showGrid)}
            className='add-image-btn transform'
          >
            {showGrid ? <img width='85%' src={grid} alt='' /> : "💻"}
          </button>
        )}
        <button
          onClick={() => setShareImageOpened(true)}
          className='add-image-btn transform'
        >
          <img width='100%' src={logoTran} alt='' />{" "}
        </button>

        <NavMenu />
      </div>
      <ShareImageModal
        shareImageOpened={shareImageOpened}
        setShareImageOpened={setShareImageOpened}
      />
    </>
  );
};

export default NavBar;
