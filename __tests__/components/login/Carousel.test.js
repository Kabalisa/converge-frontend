import React from 'react';
import { mount } from 'enzyme';
import '../../matchMedia.test';
import Carousel from '../../../src/components/login/Carousel';


document.body.innerHTML =
  '<div class="control-dots"></div> ';

describe('Carousel component', () => {
  const wrapper = mount(<Carousel legendPosition="left" />);

  it('renders correctly', () => {
    wrapper.setState({ position: 1 });
    wrapper.instance().onImageChange();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly', () => {
    wrapper.setState({ position: 0 });
    wrapper.instance().onImageChange();
    expect(wrapper).toMatchSnapshot();
  });
});
