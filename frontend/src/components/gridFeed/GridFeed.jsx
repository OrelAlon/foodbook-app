import { useState } from "react";

import ImageModal from "../imageModal/ImageModal";

import "./gridFeed.css";

const GridFeed = ({ images }) => {
  const [openedImage, setOpenedImage] = useState(false);

  const handleSelectedImage = (image) => {
    console.log(image);
  };

  return (
    <div className='grid-container'>
      <section className='image-grid-list'>
        {images.map((image, index) => (
          <div
            className='image-grid-item'
            key={index}
            onClick={() => handleSelectedImage(image)}
          >
            <div className='image-grid'>
              <figure className='image-grid-img'>
                <img src={image.img} alt={image.img} />
              </figure>
              <span className='image-grid-overlay'>
                <p>
                  <span className='image-grid-likes'>
                    🤤 {image.likes.length}
                  </span>
                  {/* <span className='image-grid-comments'>10</span> */}
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
