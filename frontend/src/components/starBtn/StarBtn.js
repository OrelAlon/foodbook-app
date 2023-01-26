const StarBtn = ({ starHandler, loading, isStar }) => {
  return (
    <>
      <div className='star-div cursor transform' onClick={starHandler}>
        {loading ? (
          <button className='loading-emoji'>⭐</button>
        ) : (
          <button className={isStar ? "" : "grayscaleText "}>⭐</button>
        )}
      </div>
    </>
  );
};

export default StarBtn;
