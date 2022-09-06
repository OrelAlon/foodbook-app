import TopBar from "../../components/topbar/TopBar";
import Feed from "../../components/feed/Feed";

import "./home.css";

const Home = () => {
  return (
    <>
      <TopBar />
      <div className='homeContainer'></div>
      <Feed />
    </>
  );
};

export default Home;
