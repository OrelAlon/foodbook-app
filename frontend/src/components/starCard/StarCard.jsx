import noAvatar from "../../assets/noAvatar.png";

const StarCard = ({ user }) => {
  console.log(user);
  const { username, profilePicture, stars } = user;

  return (
    <div className='star-card'>
      <div className='star'>⭐</div>
      <img className='star-image' src={profilePicture || noAvatar} alt='' />
      <div className='star-name'>{username}</div>
      <div className='star-count'>
        <p>with {stars.length} stars</p>
      </div>
    </div>
  );
};

export default StarCard;
