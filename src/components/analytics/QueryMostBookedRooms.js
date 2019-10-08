import React, { Fragment, useContext } from 'react';
import { pollRed } from '../../utils/images/images';
import BookedRooms from './BookedRooms';
import AnalyticsContext from '../helpers/AnalyticsContext';

export const QueryMostBookedRooms = () => {
  const { analytics, fetching } = useContext(AnalyticsContext);
  return (
    <Fragment>
      <BookedRooms
        pollIcon={pollRed}
        tip="The highest number of times meeting rooms were booked in a set time period"
        bookedRoomText="Most Booked Rooms"
        fetching={fetching}
        bookedRoomsList={fetching ? undefined : analytics.analytics.slice(0, 4)}
      />
    </Fragment>
  );
};

export default QueryMostBookedRooms;
