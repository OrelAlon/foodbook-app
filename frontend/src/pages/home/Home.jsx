import TopBar from "../../components/topbar/TopBar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RightBar";

import "./home.css";

const Home = () => {
  return (
    <>
      <TopBar />
      <div className='homeContainer'>
        <Feed />
        <RightBar />
      </div>
    </>
  );
};

export default Home;
