import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { BrowserRouter } from 'react-router-dom';
import '../matchMedia.test';
import Analytics from '../../src/containers/Analytics';
import { GET_LOCATION_QUERY } from '../../src/graphql/queries/People';
import { getUserLocation } from '../../src/components/helpers/QueriesHelpers';

let wrapper;
jest.mock('../../src/components/helpers/QueriesHelpers');
jest.mock('../../src/utils/Cookie');
jest.mock('../../src/utils/notification');

const userLocation = {
  id: 1,
  name: 'Lagos',
};
getUserLocation.mockReturnValue(userLocation);

const mocks = [
  { request: { query: GET_LOCATION_QUERY }, result: { userLocation } },
  // { request: { query: GET_LOCATIONS_QUERY }, result: allLocations.data.allLocations },
];

beforeAll(() => {
  wrapper = mount(
    <MockedProvider mocks={mocks}>
      <BrowserRouter>
        <Analytics />
      </BrowserRouter>
    </MockedProvider>,
  );
});

describe('Analytics component', () => {
  it('renders correctly in memory', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
