import { useState, useEffect } from "react";

import { fetchPostsUser, fetchPostsRestaurant } from "../../api/ApiFetch";

import Post from "../post/Post";
import Loading from "../loading/Loading";

const ProfileFeed = ({ username, restaurantname, setPostsLength }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      if (username && username !== undefined) {
        const res = await fetchPostsUser(username);

        setPosts(res.data);
        setPostsLength(res.data.length);
      } else if (restaurantname && restaurantname !== undefined) {
        const res = await fetchPostsRestaurant(restaurantname);
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
  }, [username, restaurantname]);

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
