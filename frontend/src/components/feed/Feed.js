import React, { useState, useEffect } from "react";

import axios from "axios";

import { Loader } from "@mantine/core";

import PostsFeed from "../postsFeed/PostsFeed";
import GridFeed from "../gridFeed/GridFeed";
import FilterImagesModel from "../filterImagesModel/FilterImagesModel";
import "./feed.css";

const Feed = ({ showGrid }) => {
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState([]);
  const [resultsFound, setResultsFound] = useState(undefined);
  const [msgResults, setMsgResults] = useState("");
  const [loading, setLoading] = useState(true);

  const [restaurantUserPick, setRestaurantUserPick] = useState(null);
  const [dishTypePick, setDishTypePick] = useState(null);
  const [foodCatgoryPick, setFoodCatgoryPick] = useState([]);
  // const [cityPick, setCityPick] = useState(null);

  useEffect(() => {
    setLoading(true);

    const fetchPosts = async () => {
      const res = await axios.get(`/api/posts/feed`);
      console.log("res.data");
      console.log(res.data);
      setData(res.data);
      setPosts(res.data);
      setLoading(false);
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
    } else {
      setMsgResults("No matching foods found, go out and get us a picture 😜");
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
        {loading ? (
          <div className='center-div'>
            <Loader />
          </div>
        ) : (
          <>
            {resultsFound !== undefined && resultsFound && showGrid ? (
              <PostsFeed posts={posts} />
            ) : resultsFound && !showGrid ? (
              <div>
                <GridFeed images={posts} />
              </div>
            ) : resultsFound === false ? (
              <div className='center-div msg-results'>{msgResults}</div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default Feed;
