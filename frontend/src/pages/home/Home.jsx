import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import NavMenu from "../../components/navMenu/NavMenu";
import Feed from "../../components/feed/Feed";
import ShareImageModal from "../../components/shareImageModal/ShareImageModal";

import "./home.css";

const Home = () => {
  const [shareImageOpened, setShareImageOpened] = useState(false);

  return (
    <>
      <Link to='/' style={{ textDecoration: "none" }}>
        <p className='logo'>Foodbook</p>
      </Link>
      <div className='menu-div'>
        {" "}
        <button
          onClick={() => setShareImageOpened(true)}
          className='add-image-btn'
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
