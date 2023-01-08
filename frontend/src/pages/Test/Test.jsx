import { useState, useEffect } from "react";
import axios from "axios";
import "./test.css";

const Test = () => {
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/api/posts/feed`);
      setData(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className='image-grid'>
      <section className='image-grid-list'>
        {data.map((image, index) => {
          return (
            <a href='' className='image-grid' key={index}>
              <figure className='image-grid-img'>
                <img src={image.img} alt={image.img} />
              </figure>
              <span className='image-grid-overlay'>
                <p>
                  <span className='image-grid-likes'>150</span>
                  <span className='image-grid-comments'>10</span>
                </p>
              </span>
            </a>
          );
        })}
      </section>
    </div>
  );
};

export default Test;
