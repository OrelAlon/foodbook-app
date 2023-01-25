import { useState, useEffect } from "react";
import { fetchPostsWithFilters } from "./ApiFetch";

const usePosts = (pageNum = 1, dishTypePick, cityPick, restaurantUserPick) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;
    const fetch = async () => {
      const data = await fetchPostsWithFilters(
        pageNum,
        dishTypePick,
        cityPick,
        restaurantUserPick
      );
      console.log(data);
      setResults((prev) => [...prev, ...data.posts]);
      setHasNextPage(Boolean(data.posts.length));
      setIsLoading(false);

      if (signal.aborted) return;
    };
    fetch();
    return () => controller.abort();
  }, [pageNum]);

  return { isLoading, isError, error, results, hasNextPage };
};

export default usePosts;
