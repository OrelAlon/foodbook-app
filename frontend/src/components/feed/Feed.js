import { useState, useEffect } from "react";

import axios from "axios";

import { Loader } from "@mantine/core";

import Post from "../post/Post";
import GridFeed from "../gridFeed/GridFeed";
import FilterImagesModel from "../filterImagesModel/FilterImagesModel";
import "./feed.css";

const Feed = ({ showGrid }) => {
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
  }, [restaurantUserPick]);

  const applyFilters = () => {
    let updatedShearch = data;
    if (restaurantUserPick) {
      updatedShearch = updatedShearch.filter((item) =>
        item.restaurantId.includes(restaurantUserPick)
      );
    }

    // courseTypePick Filter
    if (dishTypePick) {
      updatedShearch = updatedShearch.filter((el) =>
        el.dishType.includes(dishTypePick)
      );
    }

    // foodCatgoryPick Filter
    if (foodCatgoryPick.length > 0) {
      updatedShearch = updatedShearch.filter((el) =>
        foodCatgoryPick.every((v) => el.foodCategory.includes(v))
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
        {resultsFound && showGrid ? (
          posts.map((p) => <Post key={p._id} post={p} />)
        ) : resultsFound && !showGrid ? (
          <div>
            <GridFeed images={posts} />
          </div>
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
