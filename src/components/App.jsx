import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader'
import Button from './Button/Button'
import Modal from './Modal/Modal';
import Api from './API'

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends React.Component {
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

  componentDidUpdate(prevProps, prevState) {
    const { page, status, totalPages } = this.state;
    const prevValue = prevState.value;
    const nextValue = this.state.value;

    if (prevState.page !== page) {
      this.setState({ status: Status.PENDING });
    }

    if (prevValue !== nextValue || prevState.page !== page) {
      Api.getImages(nextValue, page)
        .then(images => {
          this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
            status: Status.RESOLVED,
            totalPages: Math.floor(images.totalHits / 12),
          }));
        })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
    }

    if (status === 'resolved' && totalPages === 0) {
      this.setState({ status: Status.IDLE });
      return alert(`Oops... there are no images matching your search ${nextValue}`);
    }

    if (status === 'resolved' && page === totalPages) {
      return alert('There are all images matching your search');
    }
  }

  onSubmitClick = data => {
    this.setState({value: data.value})
  }

  setModalData = modalData => {
    this.setState({ modalData, isShowModal: true });
  };

  handleModalClose = () => {
    this.setState({ isShowModal: false });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
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
    return (
      <div className="App"
        style={{
          height: '100vh',
          display: 'block',
          fontSize: 40,
          color: '#010101',
        }}>
        <Searchbar onSubmit={this.onSubmitClick}/>
        {images.length !== 0 && 
        <ImageGallery images={this.state.images} setModalData={this.setModalData}/>
        }
        {images.length !== 0 && page < totalPages && 
          <Button onClick={this.handleLoadMore}>Load More</Button>
        }
        {isShowModal && 
          <Modal modalData={modalData} onModalClose={this.handleModalClose}/>
        }
      </div>
    )
  }
};