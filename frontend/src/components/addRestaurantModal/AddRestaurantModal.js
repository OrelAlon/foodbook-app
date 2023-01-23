import React, { useState } from "react";

import {
  Modal,
  useMantineTheme,
  MultiSelect,
  Slider,
  Input,
  Space,
  Button,
  Select,
  Loader,
} from "@mantine/core";

import {
  IconBrandInstagram,
  IconHomePlus,
  IconWorld,
  IconCategory,
} from "@tabler/icons";

import { foodCategoryOptions, Prices, cities } from "../../api/foodData";

import { submitHandlerPost } from "../../api/ApiPostHandle";

import { BiImage } from "react-icons/bi";

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
      <form
        onSubmit={(e) =>
          submitHandlerPost(
            e,
            restaurantName,
            city,
            price,
            instagramLink,
            selectFoodCatgory,
            file,
            setErrorMsg,
            setLoading
          )
        }
      >
        {" "}
        <h1 style={{ margin: "auto" }}>Add Restaurant</h1>
        <div className='upload-image-div'>
          <label htmlFor='file' className='shareOption'>
            {/* <span className='shareText'>Upload</span> */}
            Add Image
            <BiImage fontSize={36} color={file ? "green" : "red"} />
            <input
              style={{ display: "none" }}
              type='file'
              id='file'
              accept='.png,.jpeg,.jpg,.jfif'
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          {/* {file && (
            <div className='img-upload'>
              <ImageUpload file={file} setFile={setFile} />
            </div>
          )} */}
        </div>
        <Space h='xl' />
        <div>
          <Input
            icon={<IconHomePlus size={16} />}
            style={{ width: "80%", margin: "auto", color: "dark.9" }}
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
            style={{ width: "80%", margin: "auto", color: "dark.9" }}
            label='Instagram:'
            placeholder='Instagram'
            onChange={(e) => setInstagramLink(e.target.value)}
            value={instagramLink}
            type='text'
          />
          <Space h='xl' />
          <Select
            data={cities}
            onChange={setCity}
            placeholder='city'
            icon={<IconWorld size={16} />}
            style={{ width: "80%", margin: "auto", color: "dark.9" }}
            required
          />{" "}
          <Space h='xl' />
          <MultiSelect
            icon={<IconCategory size={16} />}
            data={foodCategoryOptions}
            onChange={setSelectFoodCatgory}
            placeholder='Pick what relevant'
            style={{ width: "80%", margin: "auto" }}
          />{" "}
        </div>
        <Space h='xl' />
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
        <Space h='xl' />
        <div className='center-div'>{loading && <Loader />}</div>
        {errorMsg && <div className='error msg'>{errorMsg}</div>}
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
