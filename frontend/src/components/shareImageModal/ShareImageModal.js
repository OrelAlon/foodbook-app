import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import {
  Modal,
  useMantineTheme,
  MultiSelect,
  Loader,
  Select,
  Space,
} from "@mantine/core";

import {
  foodCategoryOptions,
  dishTypeOptions,
  Prices,
} from "../../assets/foodData";

import axios from "axios";
import ShortcutAddRestaurant from "../ShortcutAddRestaurant/ShortcutAddRestaurant";
import ImageUpload from "../imageUpload/ImageUpload";
import instagram from "../../assets/instagram.png";
import food from "../../assets/food.png";
import { BiImage } from "react-icons/bi";

import "./shareImageModal.css";

function ShareImageModal({ shareImageOpened, setShareImageOpened }) {
  const theme = useMantineTheme();
  const { user } = useContext(AuthContext);
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [restaurantUserPick, setRestaurantUserPick] = useState(null);
  const [selectFoodCatgory, setSelectFoodCatgory] = useState([]);
  const [selectDishType, setSelectDishType] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [addRestShortcut, setAddRestShortcut] = useState(false);
  const [restNewData, setRestNewData] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await axios.get(`/api/restaurants/restaurants`);
      sortRestaurants(res.data);
    };

    const sortRestaurants = (res) => {
      let arr = [];
      res.map((el) => {
        arr.push({
          value: el._id,
          label: el.restaurantname,
          group: el.city,
        });
      });

      return setRestaurantsList(
        arr.sort((a, b) =>
          a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1
        )
      );
    };

    fetchRestaurants();
  }, [addRestShortcut]);

  const test = () => {
    console.log("test");
    const newRest = {
      label: restNewData._id,
      value: restNewData.restaurantname,
    };
    setRestaurantsList((current) => [...current, newRest]);
    setRestaurantUserPick(restNewData._id);
  };

  useEffect(() => {
    if (restNewData.length == undefined) {
      test();
    }
    onSelectRestaurant(restaurantUserPick);
  }, [restNewData]);

  const onSelectRestaurant = (value) => {
    const label = restaurantsList.find((o) => o.value === value);

    setRestaurantUserPick(label);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (file == null) {
      return setErrorMsg("Please upload a image");
    }
    if (restaurantUserPick == null) {
      return setErrorMsg("Please choose a restaurant");
    }
    try {
      setErrorMsg("");

      setLoading(true);

      const data = new FormData();
      data.set("img", file);
      data.set("userId", user._id);
      data.set("foodCategory", JSON.stringify(selectFoodCatgory));
      data.set("dishType", JSON.stringify(selectDishType));
      data.set("restaurantId", restaurantUserPick.value);
      await axios.post("/api/posts", data);
      window.location.reload();
    } catch (error) {
      setErrorMsg(error.response.data.error);
    }
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      // size='98%'
      fullScreen
      opened={shareImageOpened}
      onClose={() => setShareImageOpened(false)}
    >
      {/* Modal content */}
      <form className='infoForm' onSubmit={submitHandler}>
        <div className='upload-image-div'>
          <label htmlFor='file' className='shareOption'>
            <span className='shareText'>Upload Image</span>
            <BiImage fontSize={36} color={file ? "green" : "red"} />
            <input
              style={{ display: "none" }}
              type='file'
              id='file'
              accept='.png,.jpeg,.jpg,.jfif'
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          {file && (
            <div className='img-upload'>
              <ImageUpload file={file} setFile={setFile} />
            </div>
          )}
        </div>

        <div>
          <Select
            data={restaurantsList}
            onChange={setRestaurantUserPick}
            value={restaurantUserPick}
            label='Resraurant:'
            placeholder='Select Resraurant'
            searchable
            style={{ width: "90%", margin: "auto" }}
            nothingFound='You Can Add New One ⬇️'
          />
          <div className=''>
            {" "}
            <a
              className='share'
              onClick={() => setAddRestShortcut(!addRestShortcut)}
            >
              {" "}
              Add Restaurant +
            </a>
          </div>{" "}
          {addRestShortcut && (
            <ShortcutAddRestaurant
              addRestShortcut={addRestShortcut}
              setAddRestShortcut={setAddRestShortcut}
              setRestNewData={setRestNewData}
            />
          )}
          <Space h='sm' />
          <Select
            data={dishTypeOptions}
            onChange={setSelectDishType}
            label='Dish Type 🏷️:'
            placeholder='Pick one'
            style={{ width: "90%", margin: "auto" }}
          />
          <Space h='sm' />
          <MultiSelect
            data={foodCategoryOptions}
            onChange={setSelectFoodCatgory}
            label='Food Category 🏷️:'
            placeholder='Pick all that you like'
            style={{ width: "90%", margin: "auto" }}
          />{" "}
        </div>
        <Space h='sm' />
        <Space h='sm' />
        <div className='center-div'>{loading && <Loader />}</div>
        {errorMsg && <div className='error msg'>{errorMsg}</div>}

        <div className='center-div'>
          <span className='share' onClick={submitHandler}>
            Upload
            <img src={food} alt='foodbook' className='instagram' />
          </span>{" "}
          {/* <span>
            Share with
            <img src={instagram} alt='instagram' className='instagram' />
          </span>{" "} */}
        </div>
      </form>
    </Modal>
  );
}

export default ShareImageModal;
