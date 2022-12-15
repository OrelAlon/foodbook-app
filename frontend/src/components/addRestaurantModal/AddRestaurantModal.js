import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import {
  Modal,
  useMantineTheme,
  MultiSelect,
  Slider,
  Input,
  Space,
} from "@mantine/core";
import { IconBrandInstagram, IconHomePlus, IconWorld } from "@tabler/icons";
import { foodCategoryOptions, Prices } from "../../assets/foodData";

import axios from "axios";
import ImageUpload from "../imageUpload/ImageUpload";
import instagram from "../../assets/instagram.png";
import food from "../../assets/food.png";
import { BiImage } from "react-icons/bi";

// import "./addRestaurantModal.css";

function AddRestaurantModal({ addRestaurantOpend, setAddRestaurantOpend }) {
  const theme = useMantineTheme();

  const [restaurantName, setRestaurantName] = useState("");
  const [selectFoodCatgory, setSelectFoodCatgory] = useState([]);
  const [city, setCity] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [price, setPrice] = useState();

  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {}, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (file == null) {
      return setErrorMsg("Please upload a image");
    }
    // if (restaurantUserPick == null) {
    //   return setErrorMsg("Please choose a restaurant");
    // }
    try {
      const data = new FormData();
      data.set("profilePicture", file);
      data.set("restaurantname", restaurantName);
      data.set("city", city);
      data.set("price", price);
      data.set("instgram", instagramLink);
      data.set("foodCategory", JSON.stringify(selectFoodCatgory));

      await axios.post("/api/posts", data);
      window.location.reload();
    } catch (error) {
      console.log(error);
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
      size='95%'
      opened={addRestaurantOpend}
      onClose={() => setAddRestaurantOpend(false)}
    >
      {/* Modal content */}
      <form className='infoForm' onSubmit={submitHandler}>
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

        <div>
          <Input
            icon={<IconHomePlus size={16} />}
            style={{ width: "50%", margin: "auto", color: "dark.9" }}
            label='Restaurant Name:'
            placeholder='Name'
            onChange={setRestaurantName}
            type='text'
            required
          />
          <Space h='sm' />
          <Input
            icon={<IconWorld size={16} />}
            style={{ width: "50%", margin: "auto", color: "dark.9" }}
            label='city:'
            placeholder='city'
            onChange={setCity}
            type='text'
            required
          />
          <Space h='sm' />
          <Input
            icon={<IconBrandInstagram size={16} />}
            style={{ width: "50%", margin: "auto", color: "dark.9" }}
            label='Instagram:'
            placeholder='Instagram'
            onChange={setInstagramLink}
            type='text'
            required
          />
          <Space h='sm' />
          <MultiSelect
            data={foodCategoryOptions}
            onChange={setSelectFoodCatgory}
            label='Food Category 🏷️:'
            placeholder='Pick what relevant'
            style={{ width: "50%", margin: "auto" }}
          />{" "}
        </div>
        <Space h='sm' />
        <Space h='sm' />

        <div className='slide-div'>
          <Slider
            label={(val) => Prices.find((p) => p.value === val).label}
            defaultValue={50}
            step={25}
            marks={Prices}
            styles={{
              markLabel: { display: "none" },
            }}
          />
        </div>

        <div className='share-btn-div'>
          <span onClick={submitHandler}>
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

export default AddRestaurantModal;
