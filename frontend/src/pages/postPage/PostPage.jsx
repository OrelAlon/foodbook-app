import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { fetchPostId } from "../../api/ApiFetch";

import { Image } from "@mantine/core";

import NavBar from "../../components/navBar/NavBar";
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
        <div className='image-page'>

          {" "}
          {/*  */}
          <div className='headline-post-img'>
            <div className=' go-back-div transform cursor'>
              <GoBackButton />
            </div>
            <span className=''>
              <Link to={`/profile/${post.username}`} className='linkwithout'>
                <span className='bold'> {post.username} </span>
              </Link>
              at{" "}
              <Link
                className='linkwithout'
                to={`/restaurant/${post.restaurantname}`}
              >
                <span className='bold'>{post.restaurantname}</span>
              </Link>
            </span>{" "}
          </div>
          {/*  */}
          <div className='div-image'>
            <Image radius='md' src={post.img} alt={post.img} />
          </div>
          <div className='center-div'>
            <TimePost createdAt={post.createdAt} />
          </div>
          <div className='post-page-bottom'>
            <div className='postBottomLeft'>
              {" "}
              <LikePost id={post?._id} likes={post?.likes} />
              {/* <DisLikePost id={post?._id} disLikes={post?.disLikes} /> */}
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
