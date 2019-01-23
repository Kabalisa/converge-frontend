import React from 'react';
import { shallow } from 'enzyme';
import { Checkins } from '../../../../src/components/analytics/checkins';

describe('Checkins component', () => {
  const props = {
    dateValue: { startDate: 'Nov 01 2018', endDate: 'Nov 03 2018' },
    data: {
      loading: false,
      error: null,
    },
  };
  const wrapper = shallow(<Checkins {...props} />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('contains three doughnut charts', () => {
    expect(wrapper.find('.checkins').children()).toHaveLength(3);
  });
});

