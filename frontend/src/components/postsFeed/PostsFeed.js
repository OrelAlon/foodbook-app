import Post from "../post/Post";
import GridFeed from "../gridFeed/GridFeed";

const PostsFeed = ({ posts, showGrid }) => {
  return (
    <div>
      {" "}
      <div className={`${showGrid && "active"}`}>
        <GridFeed images={posts} />
      </div>
      <div className={`${!showGrid && "active"}`}>
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default PostsFeed;
