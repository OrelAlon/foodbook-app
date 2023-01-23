import { useState, useEffect } from "react";

import { fetchPostsUser, fetchPostsRestaurant } from "../../api/ApiFetch";

import Post from "../post/Post";
import Loading from "../loading/Loading";

// import "./feed.css";

const ProfileFeed = ({ username, restaurant, setPostsLength }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      if (username) {
        const res = await fetchPostsUser(username);
        setPosts(res.data);
        setPostsLength(res.data.length);
      }
      if (restaurant) {
        const res = await fetchPostsRestaurant(restaurant);
        setPosts(res.data);
        setPostsLength(res.data.length);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [username, restaurant]);

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

export default ProfileFeed;
