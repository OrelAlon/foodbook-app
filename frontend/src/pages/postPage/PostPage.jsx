import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import axios from "axios";

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
  const [username, setUsername] = useState("");
  const [restaurantname, setRestaurantname] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const postId = useParams().id;

  useEffect(() => {
    setIsLoading(true);

    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/?id=${postId}`);
        setPost(res.data.post);
        setUsername(res.data.username);
        setRestaurantname(res.data.restaurantname);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [postId]);

  return (
    <>
      <NavBar />
      {isLoading ? (
        <div className='center-div'>
          <Loading />
        </div>
      ) : (
        <div className='image-page '>
          {" "}
          {/*  */}
          <div className='headline-post-img'>
            <span className=''>
              <Link to={`/profile/${username}`} className='linkwithout'>
                <span className='bold'> {username} </span>
              </Link>
              at{" "}
              <Link
                className='linkwithout'
                to={`/restaurant/${restaurantname}`}
              >
                <span className='bold'>{restaurantname}</span>
              </Link>
            </span>{" "}
            <GoBackButton />
          </div>
          <p className='center-div'>
            <TimePost updatedAt={post.updatedAt} />
          </p>
          {/*  */}
          <div style={{ width: 440, marginLeft: "auto", marginRight: "auto" }}>
            <Image radius='md' src={post.img} alt={post.img} />
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
