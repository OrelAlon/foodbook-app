import Post from "../post/Post";
import SharePost from "../sharePost/SharePost";
import { Posts } from "../../dummyData";
import "./feed.css";

const Feed = () => {
  return (
    <div className='feed'>
      <div className='feedWrapper'>
        {Posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
