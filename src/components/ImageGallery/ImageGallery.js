import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({images, setModalData}) => {
  return (
    <ul className = "ImageGallery">
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          largeImageURL={image.largeImageURL} 
          webformatURL={image.webformatURL} 
          tags={image.tags}
          onImageClick={setModalData}
        />
      ))}
    </ul> 
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array,
  setModalData: PropTypes.func,
};

export default ImageGallery