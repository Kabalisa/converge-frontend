import React from 'react';
import { shallow } from 'enzyme';
import '../../../matchMedia.test';
import AddResources from '../../../../src/components/onboarding/addResources/addResources';

let component = '';

describe('ADD RESOURCES', () => {
  beforeEach(() => {
    component = shallow(<AddResources />);
  });

  it('should render properly', () => {
    expect(component).toMatchSnapshot();
  });
});
