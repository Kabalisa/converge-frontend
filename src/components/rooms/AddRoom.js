import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../commons/Modal';
import AddRoomForm from './RoomForm';


class AddRoom extends Component {
  static propTypes = {
    locations: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    })).isRequired,
  }
  state = {
    closeModal: false,
  };

  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  handleAddRoom = (roomDetails) => {
    // add room logic here
    // the console statement is here to supress the eslint error of no-unused-vars
    console.log(roomDetails);
    // close modal after add room
    this.handleCloseModal();
  };

  render() {
    const { closeModal } = this.state;

    return (
      <Modal
        title="ADD ROOM"
        buttonText="Add Room"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="modal"
      >
        <AddRoomForm
          onSubmit={this.handleAddRoom}
          onCloseModalRequest={this.handleCloseModal}
          locations={this.props.locations}
        />
      </Modal>
    );
  }
}

export default AddRoom;
