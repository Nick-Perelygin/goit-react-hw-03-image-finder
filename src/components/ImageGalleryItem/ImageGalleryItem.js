import React from "react";
import PropTypes from 'prop-types';

const ImageGalleryItem = ({largeImageURL, tags, webformatURL, onImageClick }) => {
  return (
    <li className="ImageGalleryItem"
      onClick={ e => {
        e.preventDefault();
        onImageClick({ largeImageURL, tags });
      }}
    >
      <div>
        <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} loading="lazy"/>
      </div>
    </li>
    );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
  
export default ImageGalleryItem