import { useState } from "react";

import Feed from "../../components/feed/Feed";
import NavBar from "../../components/navBar/NavBar";

import "./home.css";

const Home = ({ showGrid }) => {
  return (
    <>
      <NavBar />
      <div className='homeContainer'>
        <Feed showGrid={showGrid} />
      </div>
    </>
  );
};

export default Home;
