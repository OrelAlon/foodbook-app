import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

import StarBtn from "../starBtn/StarBtn";

import noAvatar from "../../assets/noAvatar.png";

const StarCard = ({ item }) => {
  const [isStar, setIsStar] = useState();
  const [loading, setLoading] = useState(false);
  const [star, setStar] = useState();

  const { _id, username, restaurantname, profilePicture, stars } = item;

  const { user: currentUser } = useContext(AuthContext);

  const checkIfStar = item && stars ? stars.includes(currentUser._id) : false;

  useEffect(() => {
    setIsStar(checkIfStar);
    setStar(stars.length);
  }, [checkIfStar]);

  const starHandler = async () => {
    setLoading(true);
    const data = username ? "users" : "restaurants";
    try {
      await axios.put(`/api/${data}/${_id}/star`, {
        userId: currentUser._id,
      });
      if (!isStar) {
        setStar((prevStar) => prevStar + 1);

        setIsStar(true);
      } else if (isStar) {
        setStar((prevStar) => prevStar - 1);
        setIsStar(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='star-card'>
      <div className='star cursor transform'>
        <StarBtn isStar={isStar} starHandler={starHandler} loading={loading} />
      </div>
      <Link
        to={username ? `/profile/${username}` : `/restaurant/${restaurantname}`}
        style={{ textDecoration: "none" }}
      >
        <img className='star-image' src={profilePicture || noAvatar} alt='' />{" "}
      </Link>
      <div className='star-name'>{username || restaurantname}</div>{" "}
      <div className='star-count'>with {star} stars</div>
    </div>
  );
};

export default StarCard;
