import React, { useState } from "react";
import { useLocation } from "react-router";
import { Button } from "@mantine/core";

import ShareImageModal from "../shareImageModal/ShareImageModal";
import NavMenu from "../navMenu/NavMenu";
import Logo from "../logo/Logo";
import { IconPhotoPlus } from "@tabler/icons";

const NavBar = ({ setShowGrid, showGrid }) => {
  const [shareImageOpened, setShareImageOpened] = useState(false);
  const location = useLocation();

  return (
    <>
      <div className='transform' onClick={() => window.location.reload(false)}>
        <Logo />
      </div>

      <div className='menu-div transform'>
        {/* {location.pathname === "/" && (
          <button
            onClick={() => setShowGrid(!showGrid)}
            className='add-image-btn transform'
          >
            {showGrid ? "📲" : "💻"}
          </button>
        )} */}
        <Button
          onClick={() => setShareImageOpened(true)}
          className='ham-btn transform'
        >
          <IconPhotoPlus />
        </Button>
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
