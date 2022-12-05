import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

import noAvatar from "../../assets/noAvatar.png";
import { BiImage } from "react-icons/bi";

// import { Restaurants } from "../../dummyData";

import "./sharePost.css";

const SharePost = () => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [restaurantName, setRestaurantName] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const desc = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      restaurantId: restaurantName,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axios.post("/api/posts", newPost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await axios.get(`/api/restaurants/restaurants`);
      setRestaurants(res.data);
    };
    fetchRestaurants();
  }, [file]);

  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className='shareTop'>
          <img
            className='shareProfileImg'
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
            }
            alt=''
          />

          <input
            className='shareInput'
            placeholder={"What do you think " + user.username + "?"}
            ref={desc}
          />
        </div>
        <hr className='shareHr' />

        <form className='shareBottom' onSubmit={submitHandler}>
          <div className='shareOptions'>
            <label htmlFor='file' className='shareOption'>
              {/* <PermMedia htmlColor='tomato' className='shareIcon' /> */}
              <span className='shareText'>Upload</span>
              <BiImage fontSize={22} />
              <input
                style={{ display: "none" }}
                type='file'
                id='file'
                accept='.png,.jpeg,.jpg,.jfif'
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className='shareOption'>
              {/* <Label htmlColor='blue' className='shareIcon' /> */}
              {/* <span className='shareText'>Tag- </span>
              <label htmlFor='restaurant'> a place:</label> */}
              <select
                className='select'
                name='restaurant'
                id='restaurant'
                defaultValue={"DEFAULT"}
                required
                onChange={(e) => setRestaurantName(e.target.value)}
              >
                <option value='DEFAULT' disabled>
                  {" "}
                  Restaurant{" "}
                </option>
                {restaurants.map((res) => {
                  return (
                    <option key={res._id} value={res._id}>
                      {res.restaurantname}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <button className='shareButton' type='submit'>
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default SharePost;
