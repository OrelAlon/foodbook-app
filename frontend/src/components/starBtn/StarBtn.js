const StarBtn = ({ starHandler, loading, isStar }) => {
  return (
    <>
      <div onClick={starHandler}>
        {loading ? (
          <div className='loading-emoji'>⭐</div>
        ) : (
          <div className={isStar ? "" : "grayscaleText "}>⭐</div>
        )}
      </div>
    </>
  );
};

export default StarBtn;
