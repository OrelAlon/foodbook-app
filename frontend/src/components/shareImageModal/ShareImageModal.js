import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import {
  Modal,
  useMantineTheme,
  MultiSelect,
  Slider,
  Select,
  Space,
} from "@mantine/core";

import {
  foodCategoryOptions,
  dishTypeOptions,
  Price,
} from "../../assets/foodData";

import axios from "axios";
import ImageUpload from "../imageUpload/ImageUpload";
import instagram from "../../assets/instagram.png";
import food from "../../assets/food.png";
import { BiImage } from "react-icons/bi";

import "./shareImageModal.css";

function ShareImageModal({ shareImageOpened, setShareImageOpened }) {
  const theme = useMantineTheme();
  const { user } = useContext(AuthContext);

  const [restaurants, setRestaurants] = useState([]);
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await axios.get(`/api/restaurants/restaurants`);
      setRestaurants(res.data);
    };

    const sortRestaurants = (res) => {
      let arr = [];
      res.map((el) => {
        arr.push({
          value: el._id,
          label: el.restaurantname,
          group: "Tel-Aviv",
        });
      });
      return setRestaurantsList(
        arr.sort((a, b) =>
          a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1
        )
      );
    };

    fetchRestaurants();

    sortRestaurants(restaurants);
  }, [restaurants]);

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size='80%'
      opened={shareImageOpened}
      onClose={() => setShareImageOpened(false)}
    >
      {/* Modal content */}
      <form className='infoForm'>
        <div>
          <Select
            data={restaurantsList}
            label='Resraurant:'
            placeholder='Select Resraurant'
            searchable
            transitionDuration={80}
            transitionTimingFunction='ease'
            style={{ width: "70%", margin: "auto" }}
          />
          <Space h='sm' />
          <MultiSelect
            data={dishTypeOptions}
            label='Dish Type 🏷️:'
            placeholder='Pick all that you like'
            style={{ width: "70%", margin: "auto" }}
          />
          <Space h='sm' />
          <MultiSelect
            data={foodCategoryOptions}
            label='Food Category 🏷️:'
            placeholder='Pick all that you like'
            style={{ width: "70%", margin: "auto" }}
          />{" "}
        </div>
        <Space h='sm' />

        <div className='slide-div'>
          <Slider
            label={(val) => Price.find((p) => p.value === val).label}
            defaultValue={50}
            step={25}
            marks={Price}
            styles={{
              markLabel: { display: "none" },
            }}
          />
        </div>

        <div className='upload-image-div'>
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
          {file && (
            <div className='img-upload'>
              <ImageUpload file={file} setFile={setFile} />
            </div>
          )}
        </div>
        <div className='share-btn-div'>
          <span>
            Share to
            <img src={food} alt='foodbook' className='instagram' />
          </span>{" "}
          <span>
            Share with
            <img src={instagram} alt='instagram' className='instagram' />
          </span>{" "}
        </div>
      </form>
    </Modal>
  );
}

export default ShareImageModal;