import { useState, useEffect } from "react";
import { useParams } from "react-router";

import axios from "axios";

import { Image } from "@mantine/core";

import AllTags from "../../components/allTags/AllTags";

import "../../App.css";

const PostPage = () => {
  const [post, setPost] = useState({});

  const postId = useParams().id;

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`/api/posts/?id=${postId}`);
      setPost(res.data);
    };
    fetchPost();
  }, [postId]);

  return (
    <div>
      {" "}
      <img
        radius='md'
        src={post.img}
        alt={post.img}
        // width={200}
        className='open-image'
      ></img>
      <AllTags foodCategory={post?.foodCategory} dishType={post?.dishType} />{" "}
    </div>
  );
};

export default PostPage;
