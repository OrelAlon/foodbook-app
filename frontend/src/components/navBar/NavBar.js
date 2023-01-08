import { useState } from "react";

import ShareImageModal from "../shareImageModal/ShareImageModal";
import NavMenu from "../navMenu/NavMenu";
import Logo from "../logo/Logo";

const NavBar = ({ setShowGrid, showGrid }) => {
  const [shareImageOpened, setShareImageOpened] = useState(false);

  return (
    <>
      <div className='transform' onClick={() => window.location.reload(false)}>
        <Logo />
      </div>
      <div className='menu-div transform'>
        <button
          onClick={() => setShowGrid(!showGrid)}
          className='add-image-btn transform'
        >
          {showGrid ? "📲" : "💻"}
        </button>
        <button
          onClick={() => setShareImageOpened(true)}
          className='add-image-btn transform'
        >
          📷
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
