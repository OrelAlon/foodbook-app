import React from "react";
import Post from "../post/Post";
import '../post/post.scss';
const PostsFeed = React.forwardRef(({ posts }, ref) => {
  return (
    <div className="posts-feed-container">
      {posts.map((p, i) => (
        <div ref={ref} key={i}>
          <Post post={p} />
        </div>
      ))}
    </div>
  );
});

export default PostsFeed;
