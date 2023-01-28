import { useState, useEffect } from "react";

import { fetchAllUsers } from "../../api/ApiFetch";

import StarCard from "../../components/starCard/StarCard";

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
    <>
      <div className='star-container'>
        RatingStarsPage
        <button>yezs</button>
        <div className='star-cards'>
          {" "}
          <StarCard />
          <StarCard />
          <StarCard />
          <StarCard />
        </div>
      </div>
    </>
  );
};

export default RatingStarsPage;
