import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchPosts(
  query = 4,
  pageNumber,
  restaurantUserPick,
  cityPick
) {
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setPosts([]);
  }, [query]);

  const fetchPosts = async () => {
    try {
      setLoadingFetch(true);
      setError(false);
      const res = await axios.get(`/api/posts/feed?page=${pageNumber}}`);
      setPosts((prevPosts) => {
        return [...new Set([...prevPosts, ...res.data.posts])];
      });
      setHasMore(res.data.posts.length > 0);
      setLoadingFetch(false);
    } catch (error) {
      setError(true);
    }
  };

  const fetchPostsFilter = async () => {
    try {
      setLoadingFetch(true);
      setError(false);
      const res = await axios.get(
        `/api/posts/feed?page=${pageNumber}${
          restaurantUserPick !== null ? `&search=${restaurantUserPick}` : ""
        }${cityPick !== null ? `&city=${cityPick}` : ""}`
      );
      setPosts((prevPosts) => {
        return [...new Set([...prevPosts, ...res.data.posts])];
      });
      setHasMore(res.data.posts.length > 0);
      setLoadingFetch(false);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [query, pageNumber]);

  useEffect(() => {
    setPosts([]);

    fetchPostsFilter();
  }, [query, pageNumber, restaurantUserPick, cityPick]);

  return { loadingFetch, error, posts, hasMore };
}
