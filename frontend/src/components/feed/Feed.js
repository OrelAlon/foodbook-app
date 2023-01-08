import { useState, useEffect } from "react";

import axios from "axios";

import { Loader } from "@mantine/core";

import Post from "../post/Post";
import GridFeed from "../gridFeed/GridFeed";
import FilterImagesModel from "../filterImagesModel/FilterImagesModel";
import "./feed.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState([]);
  const [resultsFound, setResultsFound] = useState(true);

  const [restaurantUserPick, setRestaurantUserPick] = useState(null);
  const [dishTypePick, setDishTypePick] = useState([]);
  const [foodCatgoryPick, setFoodCatgoryPick] = useState([]);
  // const [cityPick, setCityPick] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/api/posts/feed`);
      setData(res.data);
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  const applyFilters = () => {
    let updatedShearch = data;
    if (restaurantUserPick) {
      updatedShearch = updatedShearch.filter((item) =>
        item.restaurantId.includes(restaurantUserPick)
      );
    }

    // foodCatgoryPick Filter
    if (foodCatgoryPick.length > 0) {
      updatedShearch = updatedShearch.filter((el) =>
        foodCatgoryPick.every((v) => el.foodCategory.includes(v))
      );
    }

    // dishTypePick Filter
    if (dishTypePick.length > 0) {
      updatedShearch = updatedShearch.filter((el) =>
        dishTypePick.every((v) => el.dishType.includes(v))
      );
    }
    if (updatedShearch.length > 0) {
      setPosts(updatedShearch);
    }

    setResultsFound(updatedShearch.length > 0);
  };

  useEffect(() => {
    applyFilters();
  }, [restaurantUserPick, dishTypePick, foodCatgoryPick, data]);

  return (
    <div className='feed'>
      <div className='feedWrapper'>
        <FilterImagesModel
          setFoodCatgoryPick={setFoodCatgoryPick}
          setRestaurantUserPick={setRestaurantUserPick}
          setDishTypePick={setDishTypePick}
        />
        {/* {resultsFound ? (
          posts.map((p) => <Post key={p._id} post={p} />)
        ) : (
          <div className='center-div'>
            {" "}
            <Loader />
          </div>
        )} */}
      </div>
      <GridFeed images={posts} />
    </div>
  );
};

export default Feed;
