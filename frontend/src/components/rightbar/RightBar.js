import FavoriteRestaurants from "../favoriteRest/FavoriteRestaurants";
import { Restaurants } from "../../dummyData";

import "./rightbar.css";

const RightBar = () => {
  return (
    <>
      <div className='rightbar'>
        <div className='rightbarFav'></div>
        <h4 className='rightbarTitle'>Favorite Restaurants</h4>
        <ul className='rightbarRestList'>
          {Restaurants.map((res) => (
            <FavoriteRestaurants key={res._id} restaurant={res} />
          ))}
        </ul>{" "}
      </div>
    </>
  );
};

export default RightBar;
