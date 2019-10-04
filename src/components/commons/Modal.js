import React, { Component, Fragment } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import '../../assets/styles/modal.scss';
import IconButton from './IconButtons';
import { getItemFromLocalStorage } from '../../utils/Utilities';

const customStyles = {
  content: {
    fontFamily: 'DINPro-Regular',
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #CCCCCC',
    borderRadius: '15px',
    outline: 'none',
    boxShadow: '0 2px 40px 10px rgba(185, 180, 180, 0.2)',
    backgroundColor: '#ffffff',
    overflow: 'auto',
  },
};

class MrmModal extends Component {
  static propTypes = {
    openModal: PropTypes.bool,
    showBtn: PropTypes.bool,
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    handleCloseRequest: PropTypes.func,
    closeModal: PropTypes.bool.isRequired,
    className: PropTypes.string,
    modalButtonClassName: PropTypes.string,
    buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  };

  static defaultProps = {
    openModal: false,
    showBtn: true,
    className: 'modalClass',
    modalButtonClassName: 'button',
    buttonText: '',
    handleCloseRequest: null,
  };

  state = {
    modalIsOpen: false,
  };

  componentDidMount() {
    this.useModalProp();
  }

  componentDidUpdate = (prevProps, { modalIsOpen }, snapshot) => {
    if (snapshot) {
      this.closeModal();
      this.props.handleCloseRequest && this.props.handleCloseRequest();
    }
    if (!modalIsOpen) this.useModalProp();
  };

  /**
   * Gets the snapshot before it updates the state
   *
   * @param {array} prevProps
   * @param {object} prevState
   *
   * @returns {Boolean}
   */
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (!prevProps.closeModal && prevState.modalIsOpen && this.props.closeModal) {
      return true;
    }
    return null;
  }

  /**
   * Allows opening of modal by default
   *
   * @returns {void}
   */
  useModalProp = () => {
    if (this.props.openModal) this.setState({ modalIsOpen: true });
  }

  /**
   * Allows opening of modal
   *
   * @returns {void}
   */
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  /**
   * Changes the subtitle color after
   * successfully opening the modal
   *
   * @returns {void}
   */
  afterOpenModal = () => {
    this.subtitle.style.color = '#f00';
  };

  /**
   * Allows closing of modal
   *
   * @returns {void}
   */
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const {
      buttonText, className, title, children, modalButtonClassName,
    } = this.props;
    const access = getItemFromLocalStorage('access');

    return (
      <Fragment>
        {
          this.props.showBtn &&
          <IconButton
            buttonText={buttonText}
            modalButtonClassName={modalButtonClassName}
            openModal={this.openModal}
            disabled={parseInt(access, 10) === 1}
          />
        }

        <Modal
          shouldCloseOnOverlayClick={false}
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Parent Modal"
          className={className}
          ariaHideApp={false}
        >
          <h2
            ref={(subtitle) => {
              this.subtitle = subtitle;
            }}
          >
            {title}
          </h2>
          {children}
        </Modal>
      </Fragment>
    );
  }
}

export default MrmModal;
