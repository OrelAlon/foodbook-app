import Navbar from "../../components/navbar/Navbar";
import Feed from "../../components/feed/Feed";

import "./home.css";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className='homeContainer'>
        <Feed />
      </div>
    </>
  );
};

export default Home;
