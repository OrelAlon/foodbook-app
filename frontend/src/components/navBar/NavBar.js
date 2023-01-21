import React, { useState } from "react";
import { useLocation } from "react-router";

import ShareImageModal from "../shareImageModal/ShareImageModal";
import NavMenu from "../navMenu/NavMenu";
import Logo from "../logo/Logo";

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
            className='top-right-btn transform'
          >
            {showGrid ? <i className="fa fa-th"></i> : <i className="fa fa-list"></i>}
          </button>
        )}
        <button
          onClick={() => setShareImageOpened(true)}
          className='top-right-btn transform'
        >
        <i className="fa fa-camera-retro"></i>
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
