import React from 'react';
import PropTypes from 'prop-types';
import SetupLayout from '../../../containers/SetupLayout';
import AddRoomStructure from './AddRoomStructure';
import SetupLocationPreview from './SetupLocationPreview';

const AddRoom = ({ nextPage }) => (<SetupLayout
  layoutRight={<SetupLocationPreview content="" />}
  layoutLeft={<AddRoomStructure nextPage={nextPage} />}
/>);

AddRoom.propTypes = {
  nextPage: PropTypes.func.isRequired,
};
export default AddRoom;
