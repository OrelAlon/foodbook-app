import { Link } from "react-router-dom";
import noImage from "../../assets/noImage2.jpg";

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
    </div>
  );
};

export default RestaurantCard;
