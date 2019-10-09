import React from 'react';
import { mount } from 'enzyme';
import SetupLevel from '../../../src/components/setup/SetupLevel';

describe('unit test for setup level component', () => {
  it('should render without failling', () => {
    const wrapper = mount(<SetupLevel />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.length).toEqual(1);
  });
});
