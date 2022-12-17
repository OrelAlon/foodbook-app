import { useState, useContext } from "react";

import { Menu, Button } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import ShareImageModal from "../shareImageModal/ShareImageModal";
import "./navMenu.css";

const NavMenu = () => {
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
            <Menu.Item>📰 Feed</Menu.Item>
          </Link>
          <Link to={`/restaurants`} style={{ textDecoration: "none" }}>
            <Menu.Item>🍽 Restaurants</Menu.Item>{" "}
          </Link>

          <Link
            to={`/profile/${user.username}`}
            style={{ textDecoration: "none" }}
          >
            <Menu.Item>🖼️ My Profile</Menu.Item>{" "}
          </Link>
          <Link to={`/editprofile`} style={{ textDecoration: "none" }}>
            <Menu.Item>✏️ Edit Profile</Menu.Item>{" "}
          </Link>
          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>

          <Menu.Item color='red' onClick={handleLogout}>
            🚪 Log Out
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
