import React from "react";
import Post from "../post/Post";

const PostsFeed = React.forwardRef(({ posts }, ref) => {
  return (
    <div>
      {" "}
      <div>
        {posts.map((p, i) => (
          <div ref={ref} key={i}>
            <Post post={p} />
          </div>
        ))}
      </div>
    </div>
  );
});

export default PostsFeed;
