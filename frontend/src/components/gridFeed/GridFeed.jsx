import { useState, useEffect } from "react";
import axios from "axios";
import "./gridFeed.css";

const GridFeed = () => {
  const [data, setData] = useState([]);
  const [hoveredImage, setHoveredImage] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/api/posts/feed`);
      setData(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className='grid-container'>
      <section className='image-grid-list'>
        {data.map((image, index) => (
          <div
            className='image-grid-item'
            key={index}
            onMouseEnter={() => setHoveredImage(image)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            {hoveredImage === image ? (
              <a href='' className='image-grid'>
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
            ) : (
              <a href='' className='image-grid'>
                <figure className='image-grid-img'>
                  <img src={image.img} alt={image.img} />
                </figure>
              </a>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default GridFeed;
