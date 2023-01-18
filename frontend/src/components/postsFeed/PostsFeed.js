import React from "react";

import Post from "../post/Post";

const PostsFeed = ({ posts }) => {
  console.log(posts);
  return (
    <div>
      {posts.map((p) => (
        <Post key={p._id} post={p} />
      ))}
    </div>
  );
};

export default PostsFeed;
