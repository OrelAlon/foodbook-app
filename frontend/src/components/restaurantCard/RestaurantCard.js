import { Link } from "react-router-dom";
import "./restaurantCard.css";

const RestaurantCard = ({ restaurant }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className='restaurantCard'>
      <Link to={`/restaurant/${restaurant.restaurantname}`}>
        <img
          className='rightbarProfileImg'
          src={
            restaurant.profilePicture.includes("https")
              ? restaurant.profilePicture
              : PF + restaurant.profilePicture
          }
          alt=''
        />
        <div className='restaurantName'>{restaurant.restaurantname}</div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
