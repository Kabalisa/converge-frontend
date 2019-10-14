import React from 'react';
import { shallow } from 'enzyme';
import MeetingRoomsSetup from '../../../src/components/onboarding/meetingRoomsSetup';

describe('Meeting Rooms Setup component', () => {
  const wrapper = shallow(<MeetingRoomsSetup />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
