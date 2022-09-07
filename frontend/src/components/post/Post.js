import Me from "../../assets/noAvatar.png";
import heart from "../../assets/heart.png";
import like from "../../assets/like.png";
import { Restaurants } from "../../dummyData";

import "./post.css";

const Post = ({ post }) => {
  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <img className='postProfileImg' src={Me} alt='' />
            <span className='postUsername'>
              <span className='bold'> Orel </span>in{" "}
              <span className='bold'>{Restaurants[0].restaurantname}</span>
            </span>{" "}
          </div>

          {/* <h6 className='postDate'>{format(post.createdAt)}</h6> */}
        </div>
        <div className='postCenter'>
          <img className='postImg' src={post.img} alt='' />
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <img
              className='likeIcon'
              src={like}
              //   onClick={likeHandler}
              alt=''
            />
            <img
              className='likeIcon'
              src={heart}
              //   onClick={likeHandler}
              alt=''
            />
            {/* <span className='postLikeCounter'>{like} people like it</span> */}
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
