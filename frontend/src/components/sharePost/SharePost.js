import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import AsyncSelect from "react-select/async";

import { foodCategoryOptions, dishTypeOptions } from "../../assets/foodData";
import { BiImage } from "react-icons/bi";

import ImageUpload from "../imageUpload/ImageUpload";

import "./sharePost.css";

const SharePost = () => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [restaurantName, setRestaurantName] = useState(null);
  const [selectFoodCatgory, setSelectFoodCatgory] = useState([]);
  const [selectDishType, setSelectDishType] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantsList, setRestaurantsList] = useState([]);

  const desc = useRef();
  const animatedComponents = makeAnimated();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.set("img", file);
      data.set("userId", user._id);
      data.set("desc", desc.current.value);
      data.set("foodCategory", JSON.stringify(selectFoodCatgory));
      data.set("restaurantId", restaurantName);
      await axios.post("/api/posts", data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const sortRestaurants = (res) => {
      let arr = [];
      res.map((el) => {
        arr.push({ value: el.restaurantname, label: el.restaurantname });
      });
      return setRestaurantsList(
        arr.sort((a, b) =>
          a.value.toLowerCase() > b.value.toLowerCase() ? 1 : -1
        )
      );
    };
    sortRestaurants(restaurants);
  }, [restaurants]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await axios.get(`/api/restaurants/restaurants`);
      setRestaurants(res.data);
    };
    fetchRestaurants();
  }, [file]);

  const loadOptions = (searchValue, callback) => {
    setTimeout(() => {
      const filterOptions = restaurants.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      );
      callback(filterOptions);
    }, 1000);
  };
  return (
    <div className='share'>
      <div className='shareWrapper'>
        {/* <div className='shareTop'>
          <img className='shareProfileImg' src={user.profilePicture} alt='' />

          <input
            className='shareInput'
            placeholder={"What do you think " + user.username + "?"}
            ref={desc}
          />
        </div> */}
        {/* <hr className='shareHr' /> */}

        <form className='shareBottom' onSubmit={submitHandler}>
          <div className='shareOptions'>
            <label htmlFor='file' className='shareOption'>
              {/* <span className='shareText'>Upload</span> */}
              <BiImage fontSize={26} color={file ? "green" : "red"} />
              <input
                style={{ display: "none" }}
                type='file'
                id='file'
                accept='.png,.jpeg,.jpg,.jfif'
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            {file && <ImageUpload file={file} setFile={setFile} />}

            <AsyncSelect
              loadOptions={loadOptions}
              components={animatedComponents}
              onChange={setRestaurantName}
              className='select-post'
            />
            <Select
              options={dishTypeOptions}
              components={animatedComponents}
              isMulti
              onChange={setSelectDishType}
              className='select-post'
            />
            <Select
              options={foodCategoryOptions}
              defaultValue={"Food - Category"}
              // closeMenuOnSelect={false}
              components={animatedComponents}
              // defaultValue={[colourOptions[4], colourOptions[5]]}
              isMulti
              onChange={setSelectFoodCatgory}
              className='select-post'
            />
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
