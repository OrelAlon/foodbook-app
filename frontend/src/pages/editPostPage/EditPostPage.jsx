import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import NavBar from "../../components/navBar/NavBar";
import Loading from "../../components/loading/Loading";
import ImageDisplay from "../../components/imageDisplay/ImageDisplay";

import { cities } from "../../api/foodData";
import { IconPhotoPlus } from "@tabler/icons";
import { Select } from "@mantine/core";

const EditPostPage = () => {
  const [post, setPost] = useState({});

  const [file, setFile] = useState("");
  const [userName, setUsertName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [postCity, setPostCity] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const postId = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/?id=${postId}`);
        setPost(res.data);
        setUsertName(res.data.username);
        setRestaurantName(res.data.restaurantname);
        setPostCity(res.data.city);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = new FormData();
      if (file) {
        data.set("img", file);
      }
      data.set("username", userName);
      data.set("restaurantname", restaurantName);
      data.set("city", postCity);

      await axios.put("/api/posts/" + postId, data);

      try {
        window.location.reload(false);
        navigate("/");
      } catch (error) {
        console.log(error.response);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>

      {isLoading ? (
        <Loading />
      ) : (
        <form className='profile-edit-form' onSubmit={handleSubmit}>
          <label className='profile-edit-form__label'>
            user name:
            <input
              className='profile-edit-form__input'
              type='text'
              value={userName}
              onChange={(e) => setUsertName(e.target.value)}
            />
          </label>
          <br />
          <label className='profile-edit-form__label'>
            restaurant name:
            <input
              className='profile-edit-form__input'
              type='text'
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
            />
          </label>
          <br />
          <label className='profile-edit-form__label'>City:</label>
          <Select
            data={cities}
            onChange={setPostCity}
            value={postCity}
            style={{ width: "100%", margin: "auto", color: "dark.9" }}
            searchable
          />{" "}
          <br />
          <br />
          <label
            className='profile-edit-form__label'
            onChange={(e) => setFile(e.target.files[0])}
          >
            Image:
            <div className='upload-image-div'>
              <label htmlFor='file' className='shareOption'>
                <IconPhotoPlus size={30} color={file ? "green" : "red"} />
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
                  <ImageDisplay file={file} setFile={setFile} />
                </div>
              )}
            </div>
          </label>
          <br />
          {/* {errorMsg && <div className='error msg'>{errorMsg}</div>}
      <div className='center-div'>{loading && <Loader />}</div> */}
          <button className='profile-edit-form__button' type='submit'>
            Save
          </button>
        </form>
      )}
    </>
  );
};

export default EditPostPage;
