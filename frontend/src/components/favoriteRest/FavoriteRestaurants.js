import { Link } from "react-router-dom";
import "./favoriteRestaurants.css";

const FavoriteRestaurants = ({ restaurant }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  console.log(restaurant);
  return (
    <li className='   '>
      <div className='rightbarProfileImgContainer'>
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
        </Link>
      </div>
      <span className='rightbarRestaurant'> {restaurant.restaurantname}</span>
    </li>
  );
};

export default FavoriteRestaurants;
