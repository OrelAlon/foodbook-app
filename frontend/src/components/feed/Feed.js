import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import axios from "axios";

import Post from "../post/Post";
import SharePost from "../sharePost/SharePost";

import "./feed.css";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/posts/feed`);
      setPosts(
        res.data.sort(
          (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
        )
      );
    };
    fetchPosts();
  }, [user._id]);

  return (
    <div className='feed'>
      <div className='feedWrapper'>
        {/* {user.username && <SharePost />} */}
        <SharePost />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
