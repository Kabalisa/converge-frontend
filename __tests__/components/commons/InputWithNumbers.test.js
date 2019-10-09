import React from 'react';
import { shallow } from 'enzyme';
import InputWithNumbers from '../../../src/components/commons/InputWithNumber';

describe.only('Number Input Component', () => {
  const wrapper = shallow(<InputWithNumbers />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  const initialInputValue = wrapper.instance().state.inputValue;

  it('Should update state on textChange', () => {
    wrapper.props().children.props.onChange();
    expect(initialInputValue).not.toEqual(wrapper.instance().state.inputValue);
  });
});
