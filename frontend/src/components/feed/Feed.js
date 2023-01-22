import { useState, useEffect } from "react";

import axios from "axios";

import PostsFeed from "../postsFeed/PostsFeed";
import Loading from "../loading/Loading";
import GridFeed from "../gridFeed/GridFeed";
import FilterImagesModel from "../filterImagesModel/FilterImagesModel";
import "./feed.css";

const Feed = ({ showGrid }) => {
  const [posts, setPosts] = useState([]);
  const [resultsFound, setResultsFound] = useState(undefined);
  const [msgResults, setMsgResults] = useState("");
  const [loading, setLoading] = useState(true);

  const [restaurantUserPick, setRestaurantUserPick] = useState("");
  const [dishTypePick, setDishTypePick] = useState("");
  const [page, setPage] = useState(1);
  const [cityPick, setCityPick] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      const res = await axios.get(
        `/api/posts/feed?page=${page}&search=${restaurantUserPick}&city=${cityPick}`
      );
      setResultsFound(res.data.total);
      setPosts(res.data.posts);
      setLoading(false);
    };
    fetchPosts();
  }, [restaurantUserPick, cityPick]);

  return (
    <div className='feed'>
      <div className='feedWrapper'>
        <FilterImagesModel
          setRestaurantUserPick={setRestaurantUserPick}
          setDishTypePick={setDishTypePick}
          setCityPick={setCityPick}
        />
        {loading ? (
          <div className='center-div'>
            <Loading />
          </div>
        ) : (
          <>
            {posts ? (
              <PostsFeed posts={posts} showGrid={showGrid} />
            ) : resultsFound == 0 ? (
              <div className='center-div msg-results'>{msgResults}</div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default Feed;
