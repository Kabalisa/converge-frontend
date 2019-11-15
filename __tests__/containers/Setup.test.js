import React from 'react';
import { shallow } from 'enzyme';
import '../matchMedia.test';
import Setup from '../../src/containers/Setup';

describe('Setup component', () => {
  const wrapper = shallow(<Setup />);

  it('should find an instance of Apollo(WelcomePage)', () => {
    expect(wrapper.find('Setup').exists()).toBeTruthy();
  });

  it('should find an instance of a NavBar component', () => {
    expect(wrapper.find('NavBar').exists()).toBeTruthy();
  });

  it('changeUserLocation should update state', () => {
    wrapper.instance().changeUserLocation();
    expect(wrapper.state('userLocationChanged')).toBeTruthy();
  });
});
