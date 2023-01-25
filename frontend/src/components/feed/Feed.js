import { useState, useEffect, useRef, useCallback } from "react";

import { fetchPostsWithFilters } from "../../api/ApiFetch";
import usePosts from "../../api/usePost";
import PostsFeed from "../postsFeed/PostsFeed";
import GridFeed from "../gridFeed/GridFeed";
import Pagination from "../pagination/Pagination";
import Loading from "../loading/Loading";
import FilterImagesModel from "../filterImagesModel/FilterImagesModel";
import "./feed.css";

const Feed = ({ showGrid }) => {
  const [restaurantUserPick, setRestaurantUserPick] = useState("");
  const [cityPick, setCityPick] = useState("");
  const [dishTypePick, setDishTypePick] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState();
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetch = async () => {
      setIsLoading(true);

      const data = await fetchPostsWithFilters(
        pageNum,
        restaurantUserPick,
        cityPick,
        dishTypePick
      );
      setTotal(data.total);
      console.log(data);
      setResults((prev) => [...prev, ...data.posts]);
      setHasNextPage(Boolean(data.posts.length));
      setIsLoading(false);
      setLoading(false);
    };
    fetch();
    return () => controller.abort();
  }, [pageNum, dishTypePick, cityPick, restaurantUserPick]);

  useEffect(() => {
    setLoading(true);
    setResults([]);
    setPageNum(1);
  }, [dishTypePick, cityPick, restaurantUserPick]);

  // infinite_scroll
  const intObserver = useRef();
  const lastPostRef = useCallback(
    (post) => {
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          setPageNum((prev) => prev + 1);
        }
      });
      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  const msgResults = "No pictures found, go eat there and upload a picture 😜";
  const content = showGrid ? (
    <PostsFeed posts={results} ref={lastPostRef} />
  ) : (
    <GridFeed images={results} ref={lastPostRef} />
  );
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
          <>{content}</>
        )}

        {total === 0 && (
          <div className='center-div msg-results'>{msgResults}</div>
        )}
      </div>
    </div>
  );
};

export default Feed;
