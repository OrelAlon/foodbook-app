import { Link } from "react-router-dom";
import "./restaurantCard.css";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className='restaurantCard'>
      <Link to={`/restaurant/${restaurant.restaurantname}`}>
        <img
          className='rightbarProfileImg'
          src={restaurant.profilePicture}
          alt=''
        />
        <div className='restaurantName'>{restaurant.restaurantname}</div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
