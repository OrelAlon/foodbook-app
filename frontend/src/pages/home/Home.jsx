import TopBar from "../../components/topbar/TopBar";
import Navbar from "../../components/navbar/Navbar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RightBar";

import "./home.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className='homeContainer'>
        <Feed />
        {/* <RightBar /> */}
      </div>
    </>
  );
};

export default Home;
