import { useState } from "react";

import Feed from "../../components/feed/Feed";
import NavBar from "../../components/navBar/NavBar";

import "./home.css";

const Home = () => {
  const [showGrid, setShowGrid] = useState(false);
  return (
    <>
      <NavBar setShowGrid={setShowGrid} showGrid={showGrid} />
      <div className='homeContainer'>
        <Feed showGrid={showGrid} />
      </div>
    </>
  );
};

export default Home;
