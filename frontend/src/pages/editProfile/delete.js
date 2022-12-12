import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import RestaurantsList from "../restaurantsList/RestaurantsList";

import axios from "axios";

import "./rightbar.css";

const RightBar = ({ user }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await axios.get(`/api/restaurants/restaurants`);
      setRestaurants(res.data);
    };
    fetchRestaurants();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.set("profilePicture", file);
      data.set("userId", user._id);

      await axios.put("/api/users/" + user._id, data);
      localStorage.setItem("user", JSON.stringify(user));

      try {
        window.location.reload(false);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className='rightbar'>
          <div className='rightbar'>
            <h4 className='rightbarTitle'>Restaurants:</h4>
            <ul className='rightbarRestList'>
              {restaurants.map((res) => (
                <RestaurantsList key={res._id} restaurant={res} />
              ))}
            </ul>{" "}
          </div>
          <div className='btnDiv'>
            <Link to='/addrestaurant' className='linkTimeLine'>
              <button className='addRestBtn'>Add Restaurant</button>{" "}
            </Link>
          </div>
        </div>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <div className='rightbarTitle'>User information</div>

        <form className='changePicture' onSubmit={submitHandler}>
          <label htmlFor='file' className='shareOption'>
            <span className='shareOptionText'>Change Picture</span>
            <input
              // style={{ display: "none" }}
              type='file'
              id='file'
              accept='.png,.jpeg,.jpg,.jfif'
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>{" "}
          <button className='saveButton' type='submit'>
            Save
          </button>
        </form>
      </>
    );
  };

  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default RightBar;
