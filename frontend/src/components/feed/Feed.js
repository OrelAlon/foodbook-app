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

    updatedShearch.length > 0 ? setResultsFound(true) : setResultsFound(false);
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
