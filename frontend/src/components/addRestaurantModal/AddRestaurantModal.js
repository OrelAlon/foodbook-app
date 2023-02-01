import { useState } from "react";

import {
  Modal,
  useMantineTheme,
  MultiSelect,
  Slider,
  Input,
  Space,
  Select,
  Loader,
} from "@mantine/core";

import { IconPhotoPlus } from "@tabler/icons";
import logo from "../../assets/transparent.png";

import { foodCategoryOptions, Prices, cities } from "../../api/foodData";

import { submitHandlerAddRestaurant } from "../../api/ApiPostHandle";

function AddRestaurantModal({ addRestaurantOpend, setAddRestaurantOpend }) {
  const theme = useMantineTheme();

  const [restaurantName, setRestaurantName] = useState("");
  const [selectFoodCatgory, setSelectFoodCatgory] = useState([]);
  const [city, setCity] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [price, setPrice] = useState(50);

  const [file, setFile] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    await submitHandlerAddRestaurant(
      restaurantName,
      city,
      price,
      instagramLink,
      selectFoodCatgory,
      file,
      setErrorMsg,
      setLoading
    );
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
      // size='95%'
      fullScreen
      opened={addRestaurantOpend}
      onClose={() => setAddRestaurantOpend(false)}
    >
      {/* Modal content */}
      <form onSubmit={submitHandler}>
        {" "}
        <div className='center-div'>
          <h1>Add Restaurant</h1>
        </div>
        <div className='upload-image-div'>
          <label htmlFor='file' className='shareOption'>
            Add Image
            <IconPhotoPlus size={30} color={file ? "green" : "red"} />
            <input
              style={{ display: "none" }}
              type='file'
              id='file'
              accept='.png,.jpeg,.jpg,.jfif'
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </label>
        </div>
        <Space h='sm' />
        <div>
          <Input.Wrapper
            label='Restaurant Name:'
            required
            style={{ width: "80%", margin: "auto", color: "dark.9" }}
          >
            <Input
              onChange={(e) => setRestaurantName(e.target.value)}
              value={restaurantName}
              type='text'
              required
            />
          </Input.Wrapper>
          <Space h='sm' />
          <Select
            data={cities}
            onChange={setCity}
            label='City:'
            style={{ width: "80%", margin: "auto", color: "dark.9" }}
            required
          />{" "}
          <Space h='sm' />
          <Input.Wrapper
            label='Instagram Place:'
            style={{ width: "80%", margin: "auto", color: "dark.9" }}
          >
            <Input
              onChange={(e) => setInstagramLink(e.target.value)}
              value={instagramLink}
              type='text'
            />
          </Input.Wrapper>
          <Space h='sm' />
          <MultiSelect
            data={foodCategoryOptions}
            onChange={setSelectFoodCatgory}
            label='Pick what relevant'
            style={{ width: "80%", margin: "auto" }}
          />{" "}
        </div>
        <Space h='sm' />
        <div className='slide-div'>
          <Slider
            label={(val) => Prices.find((p) => p.value === val).label}
            defaultValue={50}
            onChange={setPrice}
            step={25}
            marks={Prices}
            styles={{
              markLabel: { display: "none" },
            }}
          />
        </div>
        <div className='center-div'>{loading && <Loader />}</div>
        {errorMsg && <div className='error msg'>{errorMsg}</div>}
        <div className='center-div transform'>
          <span className='share' onClick={submitHandler}>
            <img src={logo} alt={logo} className='save-logo' />
          </span>{" "}
        </div>
      </form>
    </Modal>
  );
}

export default AddRestaurantModal;
