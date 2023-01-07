import Feed from "../../components/feed/Feed";
import NavBar from "../../components/navBar/NavBar";

import "./home.css";

const Home = () => {
  return (
    <>
      <NavBar />
      <div className='homeContainer'>
        <Feed />
      </div>
    </>
  );
};

export default Home;
