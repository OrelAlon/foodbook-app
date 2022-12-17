import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import axios from "axios";

import Post from "../post/Post";
import FilterImagesModel from "../filterImagesModel/FilterImagesModel";
import "./feed.css";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState([]);
  const [resultsFound, setResultsFound] = useState(true);

  const [restaurantUserPick, setRestaurantUserPick] = useState(null);
  const [dishTypePick, setDishTypePick] = useState([]);
  const [foodCatgoryPick, setFoodCatgoryPick] = useState([]);
  const [pricePick, setPrice] = useState([0 - 100]);

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
