import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import {
  Modal,
  useMantineTheme,
  MultiSelect,
  Slider,
  Input,
  Space,
  Button,
  Select,
} from "@mantine/core";
import {
  IconBrandInstagram,
  IconHomePlus,
  IconWorld,
  IconCategory,
} from "@tabler/icons";
import { foodCategoryOptions, Prices, cities } from "../../assets/foodData";

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
  const [price, setPrice] = useState(75);
  console.log(restaurantName);
  console.log(selectFoodCatgory);
  console.log(city);
  console.log(price);
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
      console.log(restaurantName);
      console.log(JSON.stringify(restaurantName));
      data.set("profilePicture", file);
      data.set("restaurantname", restaurantName);
      data.set("city", city);
      data.set("price", price);
      data.set("instgram", instagramLink);
      data.set("foodCategory", JSON.stringify(selectFoodCatgory));

      await axios.post("/api/restaurants/", data);
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
        <h1 style={{ margin: "auto" }}>Add Restaurant</h1>
        <div className='upload-image-div'>
          <label htmlFor='file' className='shareOption'>
            {/* <span className='shareText'>Upload</span> */}
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
        <Space h='xl' />

        <div>
          <Input
            icon={<IconHomePlus size={16} />}
            style={{ width: "50%", margin: "auto", color: "dark.9" }}
            label='Restaurant Name:'
            placeholder='Name'
            onChange={(e) => setRestaurantName(e.target.value)}
            value={restaurantName}
            type='text'
            required
          />
          <Space h='xl' />
          <Input
            icon={<IconBrandInstagram size={16} />}
            style={{ width: "50%", margin: "auto", color: "dark.9" }}
            label='Instagram:'
            placeholder='Instagram'
            onChange={(e) => setInstagramLink(e.target.value)}
            value={instagramLink}
            type='text'
            required
          />
          <Space h='xl' />
          <Select
            data={cities}
            onChange={setSelectFoodCatgory}
            placeholder='city'
            icon={<IconWorld size={16} />}
            style={{ width: "50%", margin: "auto", color: "dark.9" }}
            required
          />{" "}
          <Space h='xl' />
          <MultiSelect
            icon={<IconCategory size={16} />}
            data={foodCategoryOptions}
            onChange={setCity}
            placeholder='Pick what relevant'
            style={{ width: "50%", margin: "auto" }}
          />{" "}
        </div>
        <Space h='xl' />
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
        <Space h='xl' />

        <div className='share-btn-div'>
          <Button
            color='teal'
            style={{ margin: "auto" }}
            type={"submit"}
            size='md'
          >
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default AddRestaurantModal;
