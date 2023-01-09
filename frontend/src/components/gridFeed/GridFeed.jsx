import { useState } from "react";

import ImageModal from "../imageModal/ImageModal";

import "./gridFeed.css";

const GridFeed = ({ images }) => {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [openedImage, setOpenedImage] = useState(false);

  return (
    <div className='grid-container'>
      <section className='image-grid-list'>
        {images.map((image, index) => (
          <div
            className='image-grid-item'
            key={index}
            // onMouseEnter={() => setHoveredImage(image)}
            // onMouseLeave={() => setHoveredImage(null)}
            onClick={() => setOpenedImage(true)}
          >
            <ImageModal
              img={image.img}
              openedImage={openedImage}
              setOpenedImage={setOpenedImage}
            ></ImageModal>
            {hoveredImage === image ? (
              <div className='image-grid'>
                <figure className='image-grid-img'>
                  <img src={image.img} alt={image.img} />
                </figure>
                <span className='image-grid-overlay'>
                  <p>
                    <span className='image-grid-likes'>150</span>
                    <span className='image-grid-comments'>10</span>
                  </p>
                </span>
              </div>
            ) : (
              <div className='image-grid'>
                <figure className='image-grid-img'>
                  <img src={image.img} alt={image.img} />
                </figure>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default GridFeed;
