import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";

class ImageGallery extends React.Component {
  static propTypes = {
    images: PropTypes.array,
    setModalData: PropTypes.func,
  };
  render() {
    const{images, setModalData} = this.props
    if (images.length !== 0) {
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
  }
}

export default ImageGallery