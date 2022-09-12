import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import noAvatar from "../../assets/noAvatar.png";
import Food from "../../assets/food.png";

import "./topbar.css";

const TopBar = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();

    navigate("/login");
  };

  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <Link to='/' style={{ textDecoration: "none" }}>
          <img src={Food} alt='' className='foodImg' />

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
          <Link to={`/profile/${user.username}`}>
            <img
              src={user.profilePicture ? PF + user.profilePicture : noAvatar}
              alt=''
              className='topbarImg'
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
