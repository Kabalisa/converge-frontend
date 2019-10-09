import React from 'react';
import { shallow } from 'enzyme';
import InputField from '../../../src/components/commons/InputField';

describe.only('InputField Component', () => {
  const wrapper = shallow(<InputField />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  const textInputValue = {
    target: {
      value: 'Epic Tower',
    },
  };

  it('Should update input on textChange', () => {
    wrapper.props().children.props.onChange(textInputValue);
    const currentStateValue = wrapper.instance().state.inputValue;
    expect(currentStateValue).toBe('Epic Tower');
  });

  it('Should render default placeholder prop', () => {
    expect(wrapper.props().children.props.placeholder).toBe('eg Epic Campus');
  });

  it('Should render passed placeholder prop', () => {
    const component = shallow(<InputField placeholder="Andela Campus" />);
    expect(component.props().children.props.placeholder).toBe('Andela Campus');
  });
});
