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
  const [errorMsg, setErrorMsg] = useState("");

  const animatedComponents = makeAnimated();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (file == null) {
      return setErrorMsg("Please upload a image");
    }
    if (restaurantName == null) {
      return setErrorMsg("Please choose a restaurant");
    }
    try {
      console.log("restaurantName " + JSON.stringify(restaurantName.value));
      const data = new FormData();
      data.set("img", file);
      data.set("userId", user._id);
      data.set("foodCategory", JSON.stringify(selectFoodCatgory));
      data.set("dishType", JSON.stringify(selectDishType));
      data.set("restaurantId", restaurantName.value);
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
        arr.push({ value: el._id, label: el.restaurantname });
      });
      return setRestaurantsList(
        arr.sort((a, b) =>
          a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1
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
  }, []);

  // filter rest
  const loadOptions = (searchValue, callback) => {
    setTimeout(() => {
      const filterOptions = restaurantsList.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      );
      callback(filterOptions);
    }, 0);
  };

  return (
    <div className='share'>
      <div className='shareWrapper'>
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
              // defaultValue={[colourOptions[4], colourOptions[5]]}

              components={animatedComponents}
              isMulti
              onChange={setSelectFoodCatgory}
              className='select-post'
            />
          </div>
          <div>
            <button className='shareButton' type='submit'>
              Share
            </button>
          </div>
        </form>
        {errorMsg && <p className='err-msg'>{errorMsg}</p>}
      </div>
    </div>
  );
};

export default SharePost;
