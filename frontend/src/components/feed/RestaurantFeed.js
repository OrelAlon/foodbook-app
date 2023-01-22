import { useState, useEffect } from "react";

import { fetchPostsRestaurant } from "../../api/ApiFetch";

import Post from "../post/Post";
import Loading from "../loading/Loading";

import "./feed.css";

const RestaurantFeed = ({ restaurant, setPostsLength }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const res = await fetchPostsRestaurant(restaurant);
      setLoading(false);

      setPosts(res.data);

      setPostsLength(res.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [restaurant]);

  return (
    <div className='feed'>
      {loading ? (
        <div className='center-div'>
          <Loading />
        </div>
      ) : (
        <div className='feedWrapper'>
          {posts.map((p) => (
            <Post key={p._id} post={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantFeed;
