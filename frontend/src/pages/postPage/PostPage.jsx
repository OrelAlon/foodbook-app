import { useState, useEffect } from "react";
import { useParams } from "react-router";

import axios from "axios";

import { Image } from "@mantine/core";

import NavBar from "../../components/navBar/NavBar";
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
    <>
      <NavBar />

      <div className='image-page'>
        {" "}
        <div style={{ width: 240, marginLeft: "auto", marginRight: "auto" }}>
          <Image
            radius='md'
            src={post.img}
            alt={post.img}
            caption='My dog begging for treats'
          />
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft cursor transform '>
            🤤
            <span className='postLikeCounter'>
              {post?.likes?.length} people like it
            </span>
          </div>
          <div className='postBottomRight'>
            <AllTags
              foodCategory={post?.foodCategory}
              dishType={post?.dishType}
            />{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;
