import React from 'react';
import SetupLayout from '../../containers/SetupLayout';
import SetupLocationPreview from '../../components/setup/meetingRooms/SetupLocationPreview';
import SetupLocationStructure from './meetingRooms/SetupLocationStructure';
import RoomsStructurePreview from './meetingRooms/RoomsStructurePreview';

const BuildingLevel = () =>
  (<SetupLayout
    layoutRight={<SetupLocationPreview content={<RoomsStructurePreview />} />}
    layoutLeft={<SetupLocationStructure />}
  />);

export default BuildingLevel;
