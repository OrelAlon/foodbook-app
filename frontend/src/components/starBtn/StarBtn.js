const StarBtn = ({ starHandler, loading, isStar }) => {
  console.log(loading);
  return (
    <>
      {/* <button onClick={starHandler}>⭐</button> */}

      {/*  */}
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
