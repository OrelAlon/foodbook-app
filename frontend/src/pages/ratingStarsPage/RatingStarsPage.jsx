import { useState, useEffect } from "react";

import { fetchAllUsers } from "../../api/ApiFetch";

import StarCard from "../../components/starCard/StarCard";

const RatingStarsPage = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  console.log(data);

  const fetchDate = async () => {
    setLoading(true);
    const res = await fetchAllUsers();
    setData(res.data.sort((a, b) => b.stars.length - a.stars.length));
    setLoading(false);
  };

  useEffect(() => {
    fetchDate();
  }, []);

  return (
    <>
      <div className='star-container'>
        RatingStarsPage
        <button>yezs</button>
        {loading && <div>Loading...</div>}
        {!loading && data.length > 0 ? (
          <div className='star-cards'>
            {data.map((user, index) => (
              <StarCard key={index} user={user} />
            ))}
          </div>
        ) : (
          <div>No data</div>
        )}
      </div>
    </>
  );
};

export default RatingStarsPage;
