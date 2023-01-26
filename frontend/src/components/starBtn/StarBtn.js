import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const StarBtn = ({ starHandler }) => {
  return (
    <>
      <button onClick={starHandler}>⭐</button>
    </>
  );
};

export default StarBtn;
