import React from "react";

const FollowBtn = ({ followHandler }) => {
  return (
    <>
      <button onClick={followHandler}>⭐</button>
    </>
  );
};

export default FollowBtn;
