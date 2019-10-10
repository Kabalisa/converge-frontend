import React from 'react';
import { shallow } from 'enzyme';
import { AddroomsDesign, OnboardingLayout } from '../../../src/components/onboarding/addRooms/index';
import AddRooms from '../../../src/components/onboarding/addRooms/AddRooms';

describe.only('AddRooms component', () => {
  const props = {
    Floors: ['Floor 1', 'Floor 2'],
    activeFloor: 'Floor 1',
    block: 'Block A',
  };

  const wrapper = shallow(<AddRooms {...props} />, <AddroomsDesign />, <OnboardingLayout />);

  it('should render with no errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with no erros', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
