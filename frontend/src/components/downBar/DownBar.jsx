import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import ShareImageModal from "../shareImageModal/ShareImageModal";

import { AuthContext } from "../../context/AuthContext";
import noAvatar from "../../assets/noAvatar.png";
import {
  IconHome,
  IconToolsKitchen2,
  IconGridDots,
  IconStar,
  IconPhotoPlus,
  IconDiamond,
  IconUsers,
} from "@tabler/icons";

const DownBar = ({ setShowGrid, showGrid }) => {
  const [shareImageOpened, setShareImageOpened] = useState(false);

  const { user: currentUser } = useContext(AuthContext);
  const { pathname } = useLocation();
  const { profilePicture = noAvatar, username = "" } = currentUser || {};

  return (
    <>
      <div className='menu-div-down transform'>
        <div className='btn-downbar transform'>
          <Link to={`/`} onClick={() => setShowGrid(!showGrid)}>
            {showGrid ? (
              <IconGridDots className='black-link' />
            ) : (
              <IconHome className='black-link' />
            )}

            {/*  */}
          </Link>
        </div>
        <div className='btn-downbar transform'>
          {pathname === "/restaurants" ? (
            <Link to={`/users`}>
              <IconUsers className='black-link' />
            </Link>
          ) : (
            <Link to={`/restaurants`}>
              <IconToolsKitchen2 className='black-link' />
            </Link>
          )}
        </div>
        <div
          className='btn-downbar transform'
          onClick={() => setShareImageOpened(true)}
        >
          <IconPhotoPlus />
        </div>

        <div className='btn-downbar transform'>
          <Link to={`/ratingstars`}>
            <IconStar className='black-link' />
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
