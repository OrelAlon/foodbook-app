import { useState } from "react";
import { Button } from "@mantine/core";

import ShareImageModal from "../shareImageModal/ShareImageModal";
import NavMenu from "../navMenu/NavMenu";
import Logo from "../logo/Logo";
import { IconPhotoPlus } from "@tabler/icons";

const NavBar = () => {
  const [shareImageOpened, setShareImageOpened] = useState(false);

  return (
    <>
      <div className='transform' onClick={() => window.location.reload(false)}>
        <Logo />
      </div>

      <div className='menu-div transform'>
        <Button
          onClick={() => setShareImageOpened(true)}
          className='nav-btn transform'
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
