import React from "react";

const FollowBtn = ({ followHandler }) => {
  return (
    <>
      <button onClick={followHandler}>Follow</button>
    </>
  );
};

export default FollowBtn;
