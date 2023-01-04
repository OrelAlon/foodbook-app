import { useState } from "react";

import ShareImageModal from "../shareImageModal/ShareImageModal";
import NavMenu from "../navMenu/NavMenu";
import Logo from "../logo/Logo";

const NavBar = () => {
  const [shareImageOpened, setShareImageOpened] = useState(false);

  return (
    <>
      <div className='transform' onClick={() => window.location.reload(false)}>
        <Logo />
      </div>
      <div className='menu-div transform'>
        {" "}
        <button
          onClick={() => setShareImageOpened(true)}
          className='add-image-btn transform'
        >
          📷
        </button>
        <NavMenu />
        <ShareImageModal
          shareImageOpened={shareImageOpened}
          setShareImageOpened={setShareImageOpened}
        />
      </div>
    </>
  );
};

export default NavBar;
