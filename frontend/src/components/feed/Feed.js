import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import axios from "axios";

import Post from "../post/Post";
import FilterImagesModel from "../filterImagesModel/FilterImagesModel";
import "./feed.css";

import { data } from "./data";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState([]);
  const [resultsFound, setResultsFound] = useState(true);

  const [restaurantUserPick, setRestaurantUserPick] = useState(null);
  const [dishTypePick, setDishTypePick] = useState([]);
  const [foodCatgoryPick, setFoodCatgoryPick] = useState([]);
  const [pricePick, setPrice] = useState([0 - 100]);
  const [clearSearch, setClearSearch] = useState(null);

  const { user } = useContext(AuthContext);

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

    // Restaurant Filter
    if (restaurantUserPick) {
      updatedShearch = updatedShearch.filter((item) =>
        item.restaurantId.includes(restaurantUserPick)
      );
    }

    // foodCatgoryPick Filter
    if (foodCatgoryPick.length > 0) {
      let res = [];
      for (let i = 0; i < foodCatgoryPick.length; i++) {
        const el = foodCatgoryPick[i];

        res.push(updatedShearch.filter((val) => val.foodCategory.includes(el)));
      }

      res = res.flat();
      updatedShearch = res.filter(
        (v, i, a) => a.findIndex((v2) => v._id === v2._id) === i
      );
    }
    // dishTypePick Filter
    if (dishTypePick.length > 0) {
      let res = [];
      for (let i = 0; i < dishTypePick.length; i++) {
        const el = dishTypePick[i];

        res.push(updatedShearch.filter((val) => val.dishType.includes(el)));
      }

      res = res.flat();
      updatedShearch = res.filter(
        (v, i, a) => a.findIndex((v2) => v._id === v2._id) === i
      );
    }
    if (updatedShearch.length > 0) {
      setPosts(updatedShearch);

      updatedShearch.length > 0
        ? setResultsFound(true)
        : setResultsFound(false);
    }
  };
  useEffect(() => {
    applyFilters();
  }, [
    restaurantUserPick,
    dishTypePick,
    foodCatgoryPick,
    pricePick,
    clearSearch,
  ]);

  return (
    <div className='feed'>
      <div className='feedWrapper'>
        <FilterImagesModel
          setFoodCatgoryPick={setFoodCatgoryPick}
          setRestaurantUserPick={setRestaurantUserPick}
          setDishTypePick={setDishTypePick}
        />

        {/* Results || Empty View */}

        {resultsFound ? (
          posts.map((p) => <Post key={p._id} post={p} />)
        ) : (
          <article>
            <p>No Matching Posts</p>
          </article>
        )}
      </div>
    </div>
  );
};

export default Feed;
