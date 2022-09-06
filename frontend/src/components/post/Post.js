import "./post.css";

const Post = ({ post }) => {
  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'></div>
        </div>
        <div className='postCenter'></div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <img className='likeIcon' src={post.photo} alt='' />
          </div>
          <div className='postBottomRight'>
            {" "}
            <h3 className='postText'>{post.desc}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
