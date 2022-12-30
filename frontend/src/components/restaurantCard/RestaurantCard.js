import { Link } from "react-router-dom";
import noImage from "../../assets/noImage2.jpg";

import { IconEdit } from "@tabler/icons";

import "./restaurantCard.css";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className='restaurantCard'>
      <Link to={`/restaurant/${restaurant.restaurantname}`}>
        <img
          className='rightbarProfileImg'
          src={restaurant.profilePicture || noImage}
          alt=''
        />
        <div className='restaurantName'>{restaurant.restaurantname}</div>
      </Link>
      <span className='icon'>
        <IconEdit />
      </span>
    </div>
  );
};

export default RestaurantCard;
