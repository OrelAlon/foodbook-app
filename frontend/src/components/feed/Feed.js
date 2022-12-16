import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import axios from "axios";

import Post from "../post/Post";
import AddBtn from "../addBtn/AddBtn";
import FilterImagesModel from "../filterImagesModel/FilterImagesModel";
import "./feed.css";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [filterdPosts, setFilterdPosts] = useState([]);
  const { user } = useContext(AuthContext);
  console.log(searchResults);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/api/posts/feed`);
      setSearchResults(
        res.data.sort(
          (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
        )
      );
      setPosts(res.data);
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
        <FilterImagesModel posts={posts} setSearchResults={setSearchResults} />

        {searchResults.length > 0 ? (
          searchResults.map((p) => <Post key={p._id} post={p} />)
        ) : (
          <article>
            <p>No Matching Posts</p>
          </article>
        )}
      </div>
    </div>
  );
};

export default Feed;
