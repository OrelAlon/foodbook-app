import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../../components/navbar/Navbar";

const AllRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await axios.get(`/api/restaurants/restaurants`);
      setRestaurants(res.data);
    };
    fetchRestaurants();
  }, []);
  return (
    <>
      <Navbar />
      <div className='homeContainer'>
        <h1>AllRestaurants</h1>
        {/* <Feed /> */}
        {/* <RightBar /> */}
      </div>
    </>
  );
};

export default AllRestaurants;
