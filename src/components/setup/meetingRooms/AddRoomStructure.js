import React from 'react';
import PropTypes from 'prop-types';
import AddRooms from '../../onboarding/addRooms/AddRooms';
import '../../../assets/styles/addroom.scss';

const AddRoomStructure = ({ nextPage }) => (
  <div className="add-rooms"><AddRooms handleOnClick={nextPage} /></div>
);

AddRoomStructure.propTypes = {
  nextPage: PropTypes.func.isRequired,
};

export default AddRoomStructure;
