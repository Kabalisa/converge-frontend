import React from 'react';
import { mount } from 'enzyme';
import SetupInfoPage from '../../../src/components/setup/SetupInfoPage';

describe('Admin setup info component', () => {
  const wrapper = mount(<SetupInfoPage />);

  it('should render the get statrted case without error', () => {
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('button');
    button.simulate('click');
  });
});
