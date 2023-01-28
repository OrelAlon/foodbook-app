import noAvatar from "../../assets/noAvatar.png";

const StarCard = () => {
  return (
    <div className='star-card'>
      <div className='star'>⭐</div>
      <img className='star-image' src={noAvatar} alt='' />
      <div className='star-name'>orel</div>
      <div>{/* <p>with 100 stars</p> */}</div>
    </div>
  );
};

export default StarCard;
