import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

import StarBtn from "../starBtn/StarBtn";

import noAvatar from "../../assets/noAvatar.png";

const StarCard = ({ item }) => {
  const [isStar, setIsStar] = useState();

  const { username, restaurantname, profilePicture, stars } = item;

  const { user: currentUser } = useContext(AuthContext);

  const checkIfStar = item && stars ? stars.includes(currentUser._id) : false;

  useEffect(() => {
    setIsStar(checkIfStar);
  }, [checkIfStar]);

  return (
    <div className='star-card'>
      <div className='star cursor transform'>
        <StarBtn isStar={isStar} />
      </div>
      <img className='star-image' src={profilePicture || noAvatar} alt='' />
      <div className='star-name'>{username || restaurantname}</div>
      <div className='star-count'>with {stars.length} stars</div>
    </div>
  );
};

export default StarCard;
