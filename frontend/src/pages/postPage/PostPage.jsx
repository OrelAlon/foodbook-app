import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";

import { Image } from "@mantine/core";

const PostPage = () => {
  const [post, setPost] = useState({});

  const postIdParams = useParams().id;
  console.log(postIdParams);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`/api/post/?id=${postIdParams}`);
      setPost(res.data);
    };
    fetchPost();
  }, [usernameParams]);

  return (
    <div>
      PostPage
      <div></div>
    </div>
  );
};

export default PostPage;
