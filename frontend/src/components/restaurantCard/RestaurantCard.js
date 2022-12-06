import "./restaurantsCard.css";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className='restaurantCard'>
      <h1>{restaurant.restaurantname}</h1>
    </div>
  );
};

export default RestaurantCard;
