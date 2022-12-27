const createTempRestaurant = async (req, res) => {
  try {
    await cloudinary.api.resources_by_tag(
      "default_image",
      function (error, result) {
        console.log(result.resources[0].public_id);
      }
    );
    const defaultImagePublicId = await result.resources[0].public_id;
    imageUrl =
      (await "https://res.cloudinary.com/your-cloud-name/image/upload/") +
      defaultImagePublicId;
    const newTempRestaurant = new Restaurant({
      restaurantname: req.body.restaurantname,
      city: req.body.city,
      profilePicture: imageUrl,
    });
    const savedTempRestaurant = await newTempRestaurant.save();
    res.status(200).json(savedTempRestaurant);
  } catch (error) {
    res.status(500).json(error);
  }
};

//

//

import { useState, useEffect } from "react";

import axios from "axios";

import { Loader } from "@mantine/core";

import Post from "../post/Post";
import FilterImagesModel from "../filterImagesModel/FilterImagesModel";
import "./feed.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState([]);
  const [resultsFound, setResultsFound] = useState(true);

  const [restaurantUserPick, setRestaurantUserPick] = useState(null);
  const [dishTypePick, setDishTypePick] = useState([]);
  const [foodCatgoryPick, setFoodCatgoryPick] = useState([]);
  const [pricePick, setPricePick] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/api/posts/feed`);
      setData(res.data);
      setPosts(
        res.data.sort(
          (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
        )
      );
    };
    fetchPosts();
  }, []);

  const userPick = (foodPick, foodCategory, updatedShearch) => {
    console.log(foodPick);
    if (foodPick.length) {
      return updatedShearch.filter((el) =>
        foodPick.every((v) => el[foodCategory].includes(v))
      );
    }
    return updatedShearch;
  };
  const applyFilters = () => {
    let updatedShearch = data;
    console.log(data);
    if (restaurantUserPick) {
      updatedShearch = updatedShearch.filter((item) =>
        item.restaurantId.includes(restaurantUserPick)
      );
    }
    console.log(updatedShearch);

    // console.log(foodCatgoryPick.length);
    updatedShearch = userPick(foodCatgoryPick, "foodCategory", updatedShearch);
    updatedShearch = userPick(dishTypePick, "dishType", updatedShearch);
    // foodCatgoryPick Filter
    console.log("updatedShearch");
    console.log(updatedShearch);
    if (foodCatgoryPick.length) {
      updatedShearch = updatedShearch.filter((el) =>
        foodCatgoryPick.every((v) => el.foodCategory.includes(v))
      );
    }

    // // dishTypePick Filter
    // if (dishTypePick.length) {
    //   updatedShearch = updatedShearch.filter((el) =>
    //     dishTypePick.every((v) => el.dishType.includes(v))
    //   );
    // }

    //

    if (updatedShearch.length > 0) {
      setPosts(updatedShearch);
    }

    setResultsFound(updatedShearch.length > 0);
  };

  useEffect(() => {
    applyFilters();
  }, [restaurantUserPick, dishTypePick, foodCatgoryPick, pricePick, data]);

  return (
    <div className='feed'>
      <div className='feedWrapper'>
        <FilterImagesModel
          setFoodCatgoryPick={setFoodCatgoryPick}
          setRestaurantUserPick={setRestaurantUserPick}
          setDishTypePick={setDishTypePick}
          setPricePick={setPricePick}
          pricePick={pricePick}
        />

        {/* Results || Empty View */}
        {pricePick}
        {resultsFound ? (
          posts.map((p) => <Post key={p._id} post={p} />)
        ) : (
          <div className='center-div'>
            {" "}
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
