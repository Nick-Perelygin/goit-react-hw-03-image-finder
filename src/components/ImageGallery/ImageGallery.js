import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import Api from '../API'
import Loader from '../Loader/Loader'
import Button from '../Button/Button'
import Modal from '../Modal/Modal';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
  };

  state = {
    value: '',
    images: [],
    error: null,
    status: Status.IDLE,

    page: 1,
    totalPages: 0,

    isShowModal: false,
    modalData: { img: '', tags: '' },
  };

  static getStartProps(nextProps, prevState) {
    if (prevState.value !== nextProps.value) {
      return { page: 1, value: nextProps.value };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { page, error } = this.state;
    const prevValue = prevProps.value;
    const nextValue = this.props.value;

    if (prevValue !== nextValue || prevState.page !== page) {
      this.setState({ status: Status.PENDING });
      if (error) {
        this.setState({ error: null });
      }
      Api.getImages(nextValue, page)
        .then(images => {
          this.setState(prevState => ({
            images: page === 1 ? 
              images.hits : 
              [...prevState.images, ...images.hits],
            status: Status.RESOLVED,
            totalPages: Math.floor(images.totalHits / 12),
          }));
        })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  setModalData = modalData => {
    this.setState({ modalData, isShowModal: true });
  };

  handleModalClose = () => {
    this.setState({ isShowModal: false });
  };

  render() {
    const { images, error, status, page, totalPages, isShowModal, modalData } =
      this.state;

    if (status === 'pending') {
      return <Loader/>;
    }
    if (status === 'rejected') {
      return alert(`${error.message}`);
    }
    if (status === 'resolved' && images.length === 0) {
      return alert('Oops... there are no images matching your search... ');
    }

    if (status === 'resolved') {
      return (
        <div>
          <ul className = "ImageGallery">
            {images.map(image => (
              <ImageGalleryItem
                key={image.id}
                largeImageURL={image.largeImageURL} 
                webformatURL={image.webformatURL} 
                tags={image.tags}
                onImageClick={this.setModalData}
              />
            ))}
          </ul>
          {images.length > 0 && status !== 'pending' && page <= totalPages && 
            <Button onClick={this.handleLoadMore}>Load More</Button>
          }
          {isShowModal && 
            <Modal modalData={modalData} onModalClose={this.handleModalClose}/>
          }
        </div>
      );
    }
  }
}

export default ImageGallery