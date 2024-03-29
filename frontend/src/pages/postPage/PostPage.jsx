// PostPage.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { fetchPostId } from "../../api/ApiFetch";
import { Image } from "@mantine/core";
import AllTags from "../../components/allTags/AllTags";
import LikePost from "../../components/likePost/LikePost";
import TimePost from "../../components/timePost/TimePost";
import Loading from "../../components/loading/Loading";
import GoBackButton from "../../components/goBackButton/GoBackButton";
import "../../App.css";

const PostPage = () => {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const postId = useParams().id;

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const res = await fetchPostId(postId);
      setPost(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  return (
    <>
      {isLoading ? (
        <div className='center-div'>
          <Loading />
        </div>
      ) : (
        <div className='container'>
          <div className='restaurant-info'>
            <Link to={`/profile/${post.username}`} className='linkwithout'>
              <span className='bold'>{post.username}</span>
            </Link>
            {" at "}
            <Link
              className='linkwithout'
              to={`/restaurant/${post.restaurantname}`}
            >
              <span className='bold'>{post.restaurantname}</span>
            </Link>
          </div>
          <div className='image-container'>
            <Image radius='md' src={post.img} alt={post.img} />
          </div>
          <div className='comment-container'>
            <input type='text' placeholder='Add a comment...' />
          </div>
          <div className='bottom-container'>
            <div className='left'>
              <LikePost id={post?._id} likes={post?.likes} />
            </div>
            <div className='right'>
              <TimePost createdAt={post.createdAt} />
            </div>
          </div>
          <div className='go-back'>
            <GoBackButton />
          </div>
        </div>
      )}
    </>
  );
};

export default PostPage;
