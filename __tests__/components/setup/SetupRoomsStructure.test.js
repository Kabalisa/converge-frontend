import React from 'react';
import { shallow } from 'enzyme';
import SetupRoomsStructure from '../../../src/components/onboarding/meetingRoomsSetup/SetupRoomsStructure';

describe.only('Setup room structure component', () => {
  const wrapper = shallow(<SetupRoomsStructure />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
