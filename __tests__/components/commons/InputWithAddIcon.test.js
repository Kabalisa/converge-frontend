import React from 'react';
import { shallow } from 'enzyme';
import SingleInputWithAddIcon from '../../../src/components/commons/InputAddIcon/InputWithPlusIcon';

describe.only('Setup component', () => {
  const props = {
    inputPlaceholder: 'Building',
    pressed: jest.fn(),
  };
  const wrapper = shallow(<SingleInputWithAddIcon {...props} />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should receive inputPlaceHolderProps', () => {
    expect(wrapper.props().children.props.placeholder).toBe(props.inputPlaceholder);
  });

  it('should call pressed when click plus icon', () => {
    wrapper.props().children.props.icon.props.onClick();
    expect(props.pressed).toHaveBeenCalled();
  });
});
