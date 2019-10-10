import React from 'react';
import { shallow } from 'enzyme';
import OnboardingLayout from '../../src/containers/OnboardingLayout';
import MeetingRoomsSetup from '../../src/components/onboarding/meetingRoomsSetup/index';

describe('Setup component', () => {
  const componentLeft = (<h3 className="left-component">left component</h3>);
  const componentRight = (<h3 className="right-component">Right-component</h3>);

  const wrapper = shallow(
    <OnboardingLayout
      layoutLeft={componentLeft}
      layoutRight={componentRight}
    />, <MeetingRoomsSetup />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the left component', () => {
    expect(wrapper.find('.left-component').exists()).toBeTruthy();
  });

  it('should render the right component', () => {
    expect(wrapper.find('.right-component').exists()).toBeTruthy();
  });
  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
