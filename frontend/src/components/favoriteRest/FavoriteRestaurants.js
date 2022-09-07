import { Link } from "react-router-dom";
import "./favoriteRestaurants.css";

const FavoriteRestaurants = ({ restaurant }) => {
  return (
    <li className='rightbarRestaurants'>
      <div className='rightbarProfileImgContainer'>
        <Link to={`/restaurant/${restaurant.restaurantname}`}>
          <img
            className='rightbarProfileImg'
            src={restaurant.profilePicture}
            alt=''
          />
        </Link>
      </div>
      <span className='rightbarRestaurant'> {restaurant.restaurantname}</span>
    </li>
  );
};

export default FavoriteRestaurants;
