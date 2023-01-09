import { useState } from "react";

import ImageModal from "../imageModal/ImageModal";

import "./gridFeed.css";

const GridFeed = ({ images }) => {
  const [openedImage, setOpenedImage] = useState(false);

  return (
    <div className='grid-container'>
      <section className='image-grid-list'>
        {images.map((image, index) => (
          <div
            className='image-grid-item'
            key={index}
            onClick={() => setOpenedImage(image.img)}
          >
            <div className='image-grid'>
              <figure className='image-grid-img'>
                <img src={image.img} alt={image.img} />
              </figure>
              <span className='image-grid-overlay'>
                <p>
                  {/* <span className='image-grid-likes'>150</span>
                  <span className='image-grid-comments'>10</span> */}
                </p>
              </span>
            </div>
          </div>
        ))}
      </section>
      <ImageModal
        img={openedImage}
        openedImage={openedImage}
        setOpenedImage={setOpenedImage}
      ></ImageModal>
    </div>
  );
};

export default GridFeed;
