/* eslint-disable import/no-named-as-default */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MockedProvider } from '@apollo/react-testing';
import ALL_ANALYTICS from '../../../src/graphql/queries/analytics';
import { GET_ALL_ROOMS } from '../../../src/graphql/queries/Rooms';
import AnalyticsNav from '../../../src/components/navbars/AnalyticsNav';
import AnalyticsActivity from '../../../src/containers/AnalyticsActivity';
import Calendar from '../../../src/components/commons/Calendar';
import ExportButton from '../../../src/components/commons/ExportButton';
import { getUserRole, getUserLocation } from '../../../src/components/helpers/QueriesHelpers';


Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../../src/components/helpers/QueriesHelpers');

getUserRole.mockReturnValue('Admin');
getUserLocation.mockReturnValue({
  name: 'Lagos', id: 1,
});

const mocks = [
  {
    request: {
      query: ALL_ANALYTICS,
      variables: {
        locationId: Number(getUserLocation().id),
      },
    },
    result: {
      analyticsData: {
        allAnalytics: {
          analytics: [{
            appBookings: 0,
            appBookingsPercentage: 0,
            autoCancellations: 0,
            bookingsPercentageShare: 0,
            cancellations: 0,
            cancellationsPercentage: 0,
            checkins: 0,
            checkinsPercentage: 0,
            events: [{
              durationInMinutes: 0,
              __typename: 'Event',

            }],
            numberOfBookings: 0,
            roomName: 'Test Room 1',
            __typename: 'ConsolidatedAnalytics',

          }],
          appBookingsPercentage: 0,
          bookingsCount: [{
            period: 'Sep 02 2019',
            totalBookings: 0,
            __typename: 'BookingsCount',
          }],
          autoCancellationsPercentage: 0,
          cancellationsPercentage: 0,
          checkinsPercentage: 0,
          __typename: 'AllAnalytics',
        },
      },
    },
  },

  {
    request: {
      query: GET_ALL_ROOMS,
    },
    result: {
      allRooms: {
        rooms: [
          {
            calendarId: 'andela.com_188feuogpptp2ih3iasq3ar5ponbk6g96ssjce1l70sjedo@resource.calendar.google.com',
            capacity: 6,
            id: '1321',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/andelamrm.appspot.com/o/upload%2FThe%20Activity%20Lifecycle.png?alt=media&token=09d6943d-c618-4438-b330-95956981c10f',
            locationId: 3,
            name: 'NBO Test Room',
          },
        ],
      },
    },
  },
];

describe('AnalyticsNav Component', () => {
  const setAnalyticsState = jest.fn();
  const analyticsStateSpy = jest.spyOn(React, 'useState');
  analyticsStateSpy.mockImplementation(init => [init, setAnalyticsState]);


  it('should not render calendar or download button while fetching', () => {
    const wrapper = mount(
      <MockedProvider mocks={[]} addTypename={false}>
        <AnalyticsNav
          resetLocation={() => {}}
          locationChanged={false}
        />
      </MockedProvider>);
    expect(wrapper.find(Calendar).length).toEqual(0);
    expect(wrapper.find(ExportButton).length).toEqual(0);
  });

  it('should render the AnalyticsActivity with length of 1', () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AnalyticsNav
          resetLocation={() => {}}
          locationChanged={false}
        />
      </MockedProvider>);
    setAnalyticsState({
      activeTab: 'activity',
    });
    wrapper.find('Button').at(1).find('button').find('.activityIconBtn')
      .simulate('click');
    expect(wrapper.find(AnalyticsActivity).length).toEqual(1);
  });
});
