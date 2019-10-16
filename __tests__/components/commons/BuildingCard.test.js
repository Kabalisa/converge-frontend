import React from 'react';
import { shallow } from 'enzyme';
import BuildingCard from '../../../src/components/commons/BuildingCard';

describe('BuildingCard component', () => {
  const props = {
    blocks: ['Block A', 'Block B'],
    activeBlock: 'Block A',
  };

  const wrapper = shallow(<BuildingCard {...props} />);

  it('should render with no errors', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
