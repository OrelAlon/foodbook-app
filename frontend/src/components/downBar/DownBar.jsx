import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import ShareImageModal from "../shareImageModal/ShareImageModal";

import { AuthContext } from "../../context/AuthContext";
import noAvatar from "../../assets/noAvatar.png";
import {
  IconHome,
  IconToolsKitchen2,
  IconGridDots,
  IconInfoSquare,
  IconPhotoPlus,
} from "@tabler/icons";

const DownBar = () => {
  const [shareImageOpened, setShareImageOpened] = useState(false);

  const { user: currentUser } = useContext(AuthContext);

  const { profilePicture = noAvatar, username = "" } = currentUser || {};

  return (
    <>
      <div className='menu-div-down transform'>
        <div className='btn-downbar transform'>
          <Link to={`/`}>
            <IconHome className='black-link' />
            {/* <IconGridDots /> */}
          </Link>
        </div>
        <div className='btn-downbar transform'>
          <Link to={`/restaurants`}>
            <IconToolsKitchen2 className='black-link' />
          </Link>
        </div>
        <div
          className='btn-downbar transform'
          onClick={() => setShareImageOpened(true)}
        >
          <IconPhotoPlus />
        </div>

        <div className='btn-downbar transform'>
          <Link to={`/about`}>
            <IconInfoSquare className='black-link' />
          </Link>
        </div>
        <div className='btn-downbar transform'>
          <Link to={`/profile/${username}`}>
            <img className='profile-img-downbar' src={profilePicture} alt='' />
          </Link>
        </div>
      </div>{" "}
      <ShareImageModal
        shareImageOpened={shareImageOpened}
        setShareImageOpened={setShareImageOpened}
      />
    </>
  );
};
export default DownBar;
