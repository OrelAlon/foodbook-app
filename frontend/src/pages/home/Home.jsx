import Feed from "../../components/feed/Feed";
import "./home.scss";

const Home = ({ showGrid }) => {
  return (
    <div className='homeContainer'>
      <Feed showGrid={showGrid} />
    </div>
  );
};

export default Home;
