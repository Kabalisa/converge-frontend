import React from 'react';
import { shallow } from 'enzyme';
import InputsWithAddIcons from '../../../src/components/commons/InputAddIcon/index';

describe.only('Setup component', () => {
  const wrapper = shallow(<InputsWithAddIcons />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should add another input with plus icon on the page', () => {
    wrapper.instance().onAddInput();
    expect(wrapper.state('displayInputs')).toHaveLength(2);
  });
});
