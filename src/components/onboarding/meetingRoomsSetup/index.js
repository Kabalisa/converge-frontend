import React from 'react';
import OnboardingLayout from '../../../containers/OnboardingLayout';
import RoomsStructurePreview from './RoomsStructurePreview';
import SetupRoomsStructure from './SetupRoomsStructure';

const MeetingRoomsSetup = () => (
  <div>
    <OnboardingLayout
      layoutRight={<RoomsStructurePreview />}
      layoutLeft={<SetupRoomsStructure />}
    />
  </div>
);

export default MeetingRoomsSetup;
