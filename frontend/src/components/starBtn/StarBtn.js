import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const StarBtn = ({ id, stars = [], updateStars }) => {
  const [star, setStar] = useState(stars.length);

  const [loading, setLoading] = useState(false);

  console.log(stars);
  const { user: currentUser } = useContext(AuthContext);

  const [isStar, setIsStar] = useState();
  const checkIfStar = stars.includes(currentUser._id);

  useEffect(() => {
    setIsStar(checkIfStar);
  }, []);

  const starHandler = async () => {
    setLoading(true);

    try {
      await axios.put(`/api/users/${id}/star`, {
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
    <>
      <button onClick={starHandler}>{star}⭐</button>
    </>
  );
};

export default StarBtn;
