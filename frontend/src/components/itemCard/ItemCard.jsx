import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

import { deleteItem } from "../../api/ApiDeleteHandel";

import { IconPencil, IconTrashX } from "@tabler/icons";

import noImage from "../../assets/noImage2.jpg";

import "./itemCard.css";

const ItemCard = ({ restaurant, user, type }) => {
  const { user: currentUser } = useContext(AuthContext);

  const { _id } = restaurant || user;

  const deleteHandler = async () => {
    const confirm = window.confirm(
      `Are you sure you want to delete ${
        type === "users" ? user.username : restaurant.restaurantname
      }?`
    );

    if (confirm) {
      try {
        await deleteItem(type, _id);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='restaurantCard'>
      <Link
        to={
          type === "users"
            ? `/profile/${user.username}`
            : `/restaurant/${restaurant.restaurantname}`
        }
        style={{ textDecoration: "none" }}
      >
        <img
          className='rightbarProfileImg'
          src={
            (type === "users"
              ? user.profilePicture
              : restaurant.profilePicture) || noImage
          }
          alt=''
        />
        <div className='restaurantName'>
          {" "}
          {type === "users" ? user.username : restaurant.restaurantname}
        </div>
      </Link>
      {currentUser.isAdmin && (
        <>
          <Link
            to={
              type === "users"
                ? `/editprofile/${user._id}`
                : `/editrestaurant/${restaurant.restaurantname}`
            }
          >
            <span className='icon transform '>
              <IconPencil />
            </span>
          </Link>
          <span className='icon transform delete' onClick={deleteHandler}>
            <IconTrashX />
          </span>
        </>
      )}
    </div>
  );
};

export default ItemCard;
