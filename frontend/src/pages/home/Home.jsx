import { useState } from "react";

import NavMenu from "../../components/navMenu/NavMenu";
import Feed from "../../components/feed/Feed";
import ShareImageModal from "../../components/shareImageModal/ShareImageModal";
import Logo from "../../components/logo/Logo";

import "./home.css";

const Home = () => {
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

      <div className='homeContainer'>
        <Feed />
      </div>
    </>
  );
};

export default Home;
