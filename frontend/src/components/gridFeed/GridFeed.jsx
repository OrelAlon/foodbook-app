import { useState } from "react";

import "./gridFeed.css";

const GridFeed = ({ images }) => {
  const [hoveredImage, setHoveredImage] = useState(null);

  return (
    <div className='grid-container'>
      <section className='image-grid-list'>
        {images.map((image, index) => (
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
