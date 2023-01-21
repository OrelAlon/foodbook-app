import React, { useState, useContext } from "react";

import { Menu, Button } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import ShareImageModal from "../shareImageModal/ShareImageModal";
import "./navMenu.css";
import axios from "axios";

const NavMenu = () => {
  const [shareImageOpened, setShareImageOpened] = useState(false);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.clear();

    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    if (window.confirm(`Are you sure you want to delete your account?!?!`)) {
      if (window.confirm(`REALY?!?!`)) {
        try {
          const userDelete = await axios.delete(`/api/users/${user._id}`);
          alert("Your account has been successfully deleted.");
          navigate("/login");
        } catch (error) {
          console.error(error);
          alert(
            "An error occurred while deleting your account. Please try again later."
          );
        }
      }
    }
  };

  const style = { textDecoration: "none" };
  return (
    <>
      <Menu shadow='md' width={200} color='gray.2'>
        <Menu.Target>
          <Button width={20} className='ham-btn' style={{ lineHeight: "0" }}>
            🍔
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Link to='/' style={style}>
            <Menu.Item>📰 Feed</Menu.Item>
          </Link>
          <Link to={`/users`} style={style}>
            <Menu.Item>👩‍👧‍👦 Users</Menu.Item>{" "}
          </Link>
          <Link to={`/restaurants`} style={style}>
            <Menu.Item>🍽 Restaurants</Menu.Item>{" "}
          </Link>
          <Link to={`/profile/${user.username}`} style={style}>
            <Menu.Item>🖼️ My Profile</Menu.Item>{" "}
          </Link>
          <Link to={`/editprofile/${user.username}`} style={style}>
            <Menu.Item>✏️ Edit Profile</Menu.Item>{" "}
          </Link>
          <Link to={`/about`} style={style}>
            <Menu.Item>🍔 About</Menu.Item>{" "}
          </Link>
          <Menu.Divider />
          <Menu.Label>Danger zone</Menu.Label>

          <Menu.Item color='red' onClick={handleLogout}>
            🚪 Log Out
          </Menu.Item>
          <Menu.Item color='red' onClick={handleDeleteAccount}>
            ❌ Delete My Account
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
