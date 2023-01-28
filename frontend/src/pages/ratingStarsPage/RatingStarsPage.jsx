import { useState, useEffect } from "react";

import { fetchAll, fetchAllUsers } from "../../api/ApiFetch";

import Loading from "../../components/loading/Loading";
import StarCard from "../../components/starCard/StarCard";

const RatingStarsPage = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [whichData, setWhichData] = useState("users");

  const fetchDate = async () => {
    setLoading(true);
    const res = await fetchAll(whichData);
    setData(res.data.sort((a, b) => b.stars.length - a.stars.length));
    setLoading(false);
  };

  useEffect(() => {
    fetchDate();
  }, [whichData]);

  const toggleWhichData = () => {
    setWhichData((prevData) =>
      prevData === "users" ? "restaurants" : "users"
    );
  };
  return (
    <>
      <div className='star-container'>
        <h2>Rating Stars Page</h2>
        <button onClick={toggleWhichData}>
          {whichData === "users" ? "Restaurants" : "Users"}
        </button>
        {!loading && data?.length === 0 ? (
          <div>
            <Loading />
          </div>
        ) : (
          <>
            {data?.length > 0 && (
              <div className='star-cards'>
                {data.map((item, index) => (
                  <StarCard
                    key={index}
                    item={item}
                    toggleWhichData={toggleWhichData}
                  />
                ))}
              </div>
            )}
            {data?.length === 0 && <div>No data</div>}
          </>
        )}
      </div>
    </>
  );
};

export default RatingStarsPage;
