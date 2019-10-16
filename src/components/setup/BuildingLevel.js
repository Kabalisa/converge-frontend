import React from 'react';
import PropTypes from 'prop-types';
import SetupLayout from '../../containers/SetupLayout';
import SetupLocationPreview from '../../components/setup/meetingRooms/SetupLocationPreview';
import RoomsStructurePreview from './meetingRooms/RoomsStructurePreview';
import SetupLocation from './meetingRooms/SetupLocation';

const BuildingLevel = ({ nextPage }) =>
  (<SetupLayout
    layoutRight={<SetupLocationPreview content={<RoomsStructurePreview />} />}
    layoutLeft={<SetupLocation nextPage={nextPage} />}
  />);

BuildingLevel.propTypes = {
  nextPage: PropTypes.func.isRequired,
};

export default BuildingLevel;

