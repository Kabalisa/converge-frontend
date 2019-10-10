import React from 'react';
import AddRooms from './AddRooms';
import OnboardingLayout from '../../../containers/OnboardingLayout';

const AddroomsDesign = () => (
  <OnboardingLayout
    layoutLeft={<AddRooms />}
    layoutRight={<p> the preview of your setup</p>}
  />
);

export default AddroomsDesign;
