import React, { useState } from "react";

import { Link } from "react-router-dom";

import ImageModal from "../imageModal/ImageModal";

import "./gridFeed.scss";
const GridFeed = React.forwardRef(({ images }, ref) => {
  const [openedImage, setOpenedImage] = useState(false);

  return (
    <div className='grid-container'>
      <section className='image-grid-list'>
        {images.map((image, index) => (
          <div key={index} ref={ref}>
            <Link to={`/post/${image._id}`}>
              <div className='image-grid-item'>
                <div className='image-grid'>
                  <figure className='image-grid-img'>
                    <img src={image.img} alt={image.img} />
                  </figure>
                  <span className='image-grid-overlay'>
                    <p>
                      <span className='image-grid-likes'>
                        🤤 {image.likes.length}
                      </span>
                    </p>
                  </span>
                </div>
              </div>
            </Link>
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
});
export default GridFeed;
