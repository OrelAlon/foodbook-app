import { useState, useEffect } from "react";

import axios from "axios";
import { fetchRestaurantfetchPosts } from "../../api/ApiFatch";
import Post from "../post/Post";

import "./feed.css";

const RestaurantFeed = ({ restaurant, setPostsLength }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await fetchRestaurantfetchPosts(restaurant);

      setPosts(
        res.data.sort(
          (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
        )
      );

      setPostsLength(res.data.length);
    } catch (error) {}
  };

  useEffect(() => {
    fetchPosts();
  }, [restaurant]);

  return (
    <div className='feed'>
      <div className='feedWrapper'>
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantFeed;
