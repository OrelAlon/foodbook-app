import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

import axios from "axios";

import { IconEdit, IconEraser } from "@tabler/icons";

import noImage from "../../assets/noImage2.jpg";

const UserCard = ({ user }) => {
  const { user: currentUser } = useContext(AuthContext);

  const deleteHandler = async () => {
    if (window.confirm(`Are you sure you want to delete ${user.username}?`)) {
      try {
        await axios.delete(`/api/users/${user._id}`);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='restaurantCard'>
      <Link to={`/profile/${user.username}`}>
        <img
          className='rightbarProfileImg'
          src={user.profilePicture || noImage}
          alt=''
        />
        <div className='restaurantName'>{user.username}</div>
      </Link>
      {/* {currentUser.isAdmin && (
        <Link to={`/editprofile/${user.username}`}>
          <span className='icon transform '>
            <IconEdit />
          </span>
        </Link>
      )} */}
      {currentUser.isAdmin && (
        <span className='icon transform delete' onClick={deleteHandler}>
          <IconEraser />
        </span>
      )}
    </div>
  );
};

export default UserCard;
