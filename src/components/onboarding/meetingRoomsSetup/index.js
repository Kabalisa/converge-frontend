import React from 'react';
import OnboardingLayout from '../../../containers/OnboardingLayout';
import RoomsStructurePreview from './RoomsStructurePreview';

const MeetingRoomsSetup = () => (
  <div>
    <OnboardingLayout layoutRight={<RoomsStructurePreview />} layoutLeft={<h1>I am working</h1>} />
  </div>
);

export default MeetingRoomsSetup;
