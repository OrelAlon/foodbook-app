import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import axios from "axios";

import { Image } from "@mantine/core";

import NavBar from "../../components/navBar/NavBar";
import AllTags from "../../components/allTags/AllTags";
import LikePost from "../../components/likePost/LikePost";
import DisLikePost from "../../components/disLikePost/DisLikePost";
import "../../App.css";

const PostPage = () => {
  const [post, setPost] = useState({});
  const [username, setUsername] = useState("");
  const [restaurantname, setRestaurantname] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  console.log(post);

  const postId = useParams().id;

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);

      const res = await axios.get(`/api/posts/?id=${postId}`);
      setPost(res.data.post);
      setUsername(res.data.username);
      setRestaurantname(res.data.restaurantname);

      setIsLoading(false);
    };
    fetchPost();
  }, [postId]);

  return (
    <>
      <NavBar />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className='image-page'>
          {" "}
          <p>
            from {username} in {restaurantname}
          </p>
          <div style={{ width: 240, marginLeft: "auto", marginRight: "auto" }}>
            <Image radius='md' src={post.img} alt={post.img} />
          </div>
          <div className='postBottomPage'>
            <div className='postBottomLeft'>
              {" "}
              <LikePost id={post?._id} likes={post?.likes} />
              <DisLikePost id={post?._id} disLikes={post?.disLikes} />
            </div>

            <div className='postBottomRight'>
              <AllTags
                foodCategory={post.foodCategory}
                dishType={post.dishType}
              />{" "}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostPage;
