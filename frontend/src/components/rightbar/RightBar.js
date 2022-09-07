import "./rightbar.css";

const RightBar = () => {
  return (
    <>
      <div className='rightbar'>
        <div className='rightbarFav'></div>
        <h4 className='rightbarTitle'>Favorite Restaurants</h4>
        <ul className='rightbarFriendList'>
          <h4>orel</h4>
          <h4>orel</h4>
          <h4>orel</h4>
          <h4>orel</h4>
          {/* {restaurantsList.map((res) => (
        <Favorite key={res._id} restaurant={res} />
      ))} */}
        </ul>{" "}
      </div>
    </>
  );
};

export default RightBar;
