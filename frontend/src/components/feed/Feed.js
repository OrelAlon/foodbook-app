import { useState, useEffect } from "react";

import { fetchPostsWithFilters } from "../../api/ApiFetch";

import PostsFeed from "../postsFeed/PostsFeed";
import Pagination from "../pagination/Pagination";
import Loading from "../loading/Loading";
import FilterImagesModel from "../filterImagesModel/FilterImagesModel";
import "./feed.css";

const Feed = ({ showGrid }) => {
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState({});
  const [msgResults, setMsgResults] = useState(
    "No pictures found, go eat there and upload a picture 😜"
  );
  const [loading, setLoading] = useState(true);

  const [restaurantUserPick, setRestaurantUserPick] = useState("");
  const [dishTypePick, setDishTypePick] = useState("");
  const [page, setPage] = useState(1);
  const [cityPick, setCityPick] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchPostsWithFilters(
        page,
        restaurantUserPick,
        cityPick
      );
      setData(data);
      setPosts(data.posts);
      setLoading(false);
    };
    fetchData();
  }, [restaurantUserPick, cityPick, page]);

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
            {posts.length > 0 ? (
              <PostsFeed posts={posts} showGrid={showGrid} />
            ) : (
              <div className='center-div msg-results'>{msgResults}</div>
            )}
          </>
        )}
      </div>
      <div className='center-div'>
        <Pagination
          page={page}
          limit={data.pageSize ? data.pageSize : 0}
          total={data.total ? data.total : 0}
          setPage={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default Feed;
