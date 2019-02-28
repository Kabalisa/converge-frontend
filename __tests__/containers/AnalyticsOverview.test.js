import React from 'react';
import { shallow } from 'enzyme';
import AnalyticsOverview from '../../src/containers/AnalyticsOverview';

describe('AnalyticsOverview Component', () => {
  const props = {
    queryCompleted: jest.fn(),
    dateValue: {
      validatedStartDate: '',
      validatedEndDate: '',
    },
  };
  const wrapper = shallow(<AnalyticsOverview {...props} />);
  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
