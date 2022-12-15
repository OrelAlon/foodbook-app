import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import axios from "axios";

import Post from "../post/Post";
import AddBtn from "../addBtn/AddBtn";
import FilterImagesModel from "../filterImagesModel/FilterImagesModel";
import "./feed.css";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const [userSearchPick, setUserSearchPick] = useState([]);
  const { user } = useContext(AuthContext);

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
  }, []);
  const getSearchData = (data) => {
    showSearchPost(data);
  };

  const showSearchPost = (data) => {
    const filtered = posts.filter(
      (val) =>
        val.foodCategory.includes(data.foodCatgoryPick) &&
        val.dishType.includes(data.dishTypePick) &&
        val.restaurantId.includes(data.restaurantUserPick)
    );

    return setPosts(filtered);
  };

  return (
    <div className='feed'>
      <div className='feedWrapper'>
        <FilterImagesModel onSubmit={getSearchData} />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
