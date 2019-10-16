import React from 'react';
import { shallow } from 'enzyme';
import '../matchMedia.test';
import OnboardingPages from '../../src/containers/OnboardingPages';

describe('OnboardingPages component', () => {
  it('should render the default page', () => {
    const wrapper = shallow(<OnboardingPages centerSetupLevel="defaultcase" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render the welcome page', () => {
    const wrapper = shallow(<OnboardingPages centerSetupLevel="welcomePage" />);
    const { handleOnClick } = wrapper.instance();
    handleOnClick('buildingsSetup');
    expect(wrapper).toMatchSnapshot();
  });
  it('should render the setupLocation page', () => {
    const wrapper = shallow(<OnboardingPages centerSetupLevel="buildingsSetup" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render the officeStructure page', () => {
    const wrapper = shallow(<OnboardingPages centerSetupLevel="officeStructure" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render the addRooms page', () => {
    const wrapper = shallow(<OnboardingPages centerSetupLevel="addRooms" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render the addResources page', () => {
    const wrapper = shallow(<OnboardingPages centerSetupLevel="addResources" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('it should render the Container component', () => {
    const wrapper = shallow(<OnboardingPages centerSetupLevel="welcomePage" />);
    wrapper.setState({ page: 1 });
  });
});
