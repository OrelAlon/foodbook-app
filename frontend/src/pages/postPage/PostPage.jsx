import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";

import axios from "axios";

import { Image } from "@mantine/core";
import TagPost from "../../components/tagPost/TagPost";
const PostPage = () => {
  const [post, setPost] = useState({});

  const postId = useParams().id;
  console.log(post);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`/api/posts/?id=${postId}`);
      setPost(res.data);
    };
    fetchPost();
  }, [postId]);

  return (
    <div>
      <Image
        radius='md'
        src={post.img}
        alt={post.img}
        // width={200}
        className='open-image'
      ></Image>
      <ul className='tags '>
        {post.foodCategory.map((el, i) => (
          <TagPost key={i} el={el} />
        ))}
      </ul>
      <ul className='tags'>
        {post.dishType.map((el, i) => (
          <TagPost key={i} el={el} />
        ))}
      </ul>
    </div>
  );
};

export default PostPage;
