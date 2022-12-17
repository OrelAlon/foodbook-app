import { useState, useEffect } from "react";

import axios from "axios";
import { fetchRestaurantfetchPosts } from "../../api/ApiFatch";
import RestaurantPost from "../post/RestaurantPost";

import "./feed.css";

const RestaurantFeed = ({ restaurant }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await fetchRestaurantfetchPosts(restaurant);

      setPosts(
        res.data.sort(
          (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
        )
      );
    } catch (error) {}
  };

  useEffect(() => {
    fetchPosts();
  }, [restaurant]);

  return (
    <div className='feed'>
      <div className='feedWrapper'>
        {posts.map((p) => (
          <RestaurantPost key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantFeed;
