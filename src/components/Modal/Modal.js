import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends React.Component {
  static propTypes = {
    modalData: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
    onModalClose: PropTypes.func,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleBackdropeClick);
  }

  handleKeyDown = e => {
    if (e.code === `Escape`) {
      this.props.onModalClose();
    }
  };

  handleBackdropeClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onModalClose();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.modalData;

    return createPortal(
      <div className="Overlay" onClick={this.handleBackdropeClick}>
        <div className="Modal">
          <img src={largeImageURL} alt={tags} />
          <p>{tags}</p>
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal