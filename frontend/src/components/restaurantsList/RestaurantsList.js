import { Link } from "react-router-dom";
import "./restaurantsList.css";

const RestaurantsList = ({ restaurant }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li li className='rest-div'>
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

export default RestaurantsList;
