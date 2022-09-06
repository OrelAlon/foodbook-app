import { Link, useNavigate } from "react-router-dom";
import Me from "../../assets/noAvatar.png";
import Food from "../../assets/food.png";

import "./topbar.css";

const TopBar = () => {
  const navigate = useNavigate();
  const handleLogout = (r) => {
    navigate("/login");
  };

  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <Link to='/' style={{ textDecoration: "none" }}>
          <img src={Food} className='foodImg' />

          <span className='logo'>Foodbook</span>
        </Link>
      </div>
      {/* <div className='topbarCenter'>
        <div className='searchbar'>
          <Search className='searchIcon' />
          <input placeholder='Search Something....' className='searchInput' />
        </div>
      </div> */}
      <div className='topbarRight'>
        <div className='topbrrLinks'>
          <Link to='/' className='linkTimeLine'>
            <span className='topbarLink'>Time-Line</span>
          </Link>

          <span className='topbarLink' onClick={handleLogout}>
            Log-Out
          </span>
        </div>
        <div>
          {/* <Link to={`/profile/${user.username}`}> */}
          <img
            //   src={user.profilePicture ? PF + user.profilePicture : noAvatar}
            src={Me}
            alt=''
            className='topbarImg'
          />
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
