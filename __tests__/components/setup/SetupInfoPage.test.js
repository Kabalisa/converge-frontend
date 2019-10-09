import React from 'react';
import { shallow } from 'enzyme';
import SetupInfoPage from '../../../src/components/setup/SetupInfoPage';

describe('Admin setup info component', () => {
  const props = {
    handleClick: jest.fn(),
  };
  const wrapper = shallow(<SetupInfoPage {...props} />);

  it('should call handleClick with "BuildingLevel" as the parameter when the continue button is clicked', () => {
    const spy = jest.spyOn(props, 'handleClick');
    const continueButton = wrapper.find('[title="Get Started"]');
    continueButton.simulate('click');
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('BuildingLevel');
  });
});
