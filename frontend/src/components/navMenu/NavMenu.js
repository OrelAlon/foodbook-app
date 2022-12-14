import { useState, useContext } from "react";

import { Menu, Button } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import {
  IconSettings,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from "@tabler/icons";

import ShareImageModal from "../shareImageModal/ShareImageModal";
import "./navMenu.css";

const NavMenu = () => {
  const [toggleMenu, setToggleMenu] = useState(true);
  const [shareImageOpened, setShareImageOpened] = useState(false);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();

    navigate("/login");
  };

  return (
    <>
      <Menu shadow='md' width={200} color='gray.2'>
        <Menu.Target>
          <Button width={20} className='ham-btn'>
            🍔
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Link to='/' style={{ textDecoration: "none" }}>
            <Menu.Item icon={<IconSettings size={14} />}>Feed</Menu.Item>
          </Link>
          <Link to={`/restaurants`} style={{ textDecoration: "none" }}>
            <Menu.Item icon={<IconMessageCircle size={14} />}>
              Restaurants
            </Menu.Item>{" "}
          </Link>

          <Link
            to={`/profile/${user.username}`}
            style={{ textDecoration: "none" }}
          >
            <Menu.Item icon={<IconPhoto size={14} />}>My Profile</Menu.Item>{" "}
          </Link>

          {/* <Menu.Item
            icon={
              <IconArrowsLeftRight
                size={14}
                onClick={() => setShareImageOpened(true)}
              />
            }
          >
            Add Image
          </Menu.Item> */}

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>

          <Menu.Item
            color='red'
            icon={<IconTrash size={14} />}
            onClick={handleLogout}
          >
            Log Out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <ShareImageModal
        shareImageOpened={shareImageOpened}
        setShareImageOpened={setShareImageOpened}
      />
    </>
  );
};

export default NavMenu;
