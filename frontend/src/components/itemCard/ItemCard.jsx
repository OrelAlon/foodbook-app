import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

import axios from "axios";

import { IconPencil, IconTrashX } from "@tabler/icons";

import noImage from "../../assets/noImage2.jpg";

import "./itemCard.css";

const ItemCard = ({ restaurant }) => {
  const { user: currentUser } = useContext(AuthContext);

  const deleteHandler = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${restaurant.restaurantname}?`
      )
    ) {
      try {
        await axios.delete(`/api/restaurants/${restaurant._id}`);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='restaurantCard'>
      <Link
        to={`/restaurant/${restaurant.restaurantname}`}
        style={{ textDecoration: "none" }}
      >
        <img
          className='rightbarProfileImg'
          src={restaurant.profilePicture || noImage}
          alt=''
        />
        <div className='restaurantName'>{restaurant.restaurantname}</div>
      </Link>
      <Link to={`/editrestaurant/${restaurant.restaurantname}`}>
        <span className='icon transform '>
          <IconPencil />
        </span>
      </Link>
      {currentUser.isAdmin && (
        <span className='icon transform delete' onClick={deleteHandler}>
          <IconTrashX />
        </span>
      )}
    </div>
  );
};

export default ItemCard;
