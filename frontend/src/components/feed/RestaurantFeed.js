import { useState, useEffect } from "react";

import axios from "axios";

import RestaurantPost from "../post/RestaurantPost";

import "./feed.css";

const RestaurantFeed = ({ restaurant }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = restaurant.restaurantname
        ? await axios.get(`/api/posts/restaurants/${restaurant.restaurantname}`)
        : await axios.get(`/api/posts/restaurants/${restaurant._id}`);
      setPosts(
        res.data.sort(
          (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
        )
      );
    };
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
