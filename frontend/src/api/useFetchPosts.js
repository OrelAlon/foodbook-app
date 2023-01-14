import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchPosts(query = 4, pageNumber) {
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setPosts([]);
  }, [query]);

  useEffect(() => {
    setLoadingFetch(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: `/api/posts/feed`,
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setPosts((prevPosts) => {
          return [...new Set([...prevPosts, ...res.data])];
        });
        setHasMore(res.data.length > 0);
        setLoadingFetch(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);

  return { loadingFetch, error, posts, hasMore };
}
