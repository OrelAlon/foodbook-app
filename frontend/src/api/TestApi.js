import axios from "axios";
import { useEffect, useState } from "react";

const TestApi = () => {
  const [rest, setRest] = useState([]);

  useEffect(() => {
    // fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:5500/api/restaurants/restaurants")
      .then((response) => response.json())
      .then((data) => {
        setRest(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export default TestApi;
