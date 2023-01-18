import Post from "../post/Post";
import GridFeed from "../gridFeed/GridFeed";

const PostsFeed = ({ posts, showGrid }) => {
  return (
    <div>
      {" "}
      <div style={{ display: showGrid ? "" : "none" }}>
        <GridFeed images={posts} />
      </div>
      <div style={{ display: showGrid ? "none" : "" }}>
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default PostsFeed;
