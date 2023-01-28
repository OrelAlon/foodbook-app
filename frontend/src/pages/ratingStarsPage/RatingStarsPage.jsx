import { useState, useEffect } from "react";

import { fetchAllUsers } from "../../api/ApiFetch";

const RatingStarsPage = () => {
  const [data, setData] = useState();

  console.log(data);

  const fetchDate = async () => {
    const res = await fetchAllUsers();
    setData(res.data.sort((a, b) => b.stars.length - a.stars.length));
  };
  useEffect(() => {
    fetchDate();
  }, []);

  return (
    <div>
      RatingStarsPage
      <button>yezs</button>
    </div>
  );
};

export default RatingStarsPage;
