import React from 'react';
import { shallow } from 'enzyme';
import RoomsStructurePreview from '../../../src/components/onboarding/meetingRoomsSetup/RoomsStructurePreview';

describe.only('Setup component', () => {
  const wrapper = shallow(<RoomsStructurePreview />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
