import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

import StarBtn from "../starBtn/StarBtn";

import noAvatar from "../../assets/noAvatar.png";

const StarCard = ({ user }) => {
  console.log(user);
  const { username, profilePicture, stars } = user;

  return (
    <div className='star-card'>
      <div className='star'>
        <StarBtn />
      </div>
      <img className='star-image' src={profilePicture || noAvatar} alt='' />
      <div className='star-name'>{username}</div>
      <div className='star-count'>with {stars.length} stars</div>
    </div>
  );
};

export default StarCard;
