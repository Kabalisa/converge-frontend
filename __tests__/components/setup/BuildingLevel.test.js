import React from 'react';
import { mount } from 'enzyme';
import BuildingSetup from '../../../src/components/setup/BuildingLevel';


describe('building setup component', () => {
  it('', () => {
    const wrapper = mount(<BuildingSetup />);
    expect(wrapper.length).toEqual(1);
  });
});
