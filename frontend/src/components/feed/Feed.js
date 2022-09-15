import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router";

import axios from "axios";

import Post from "../post/Post";
import SharePost from "../sharePost/SharePost";

import "./feed.css";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const link = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/api/posts/feed`);
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
        {user.username && <SharePost />}
        {/* {!Object.keys(link).length === 0 && <h1>chek</h1>} */}

        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
