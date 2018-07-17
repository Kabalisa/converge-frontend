import React from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';

import Room from './Room';
import '../assets/styles/roomlist.scss';
import { GET_ROOMS_QUERY, GET_LOCATIONS_QUERY } from '../graphql/queries/Rooms';
import { formatRoomData } from '../graphql/mappers/Rooms';
import ColGroup from './helpers/ColGroup';
import TableHead from './helpers/TableHead';
import AddRoom from './rooms/AddRoom';

const RoomsList = (props) => {
  const { allRooms, loading, error } = props.data;
  const {
    allLocations: locations,
    loading: loadingLocations,
    error: locationsError,
  } = props.locations;

  if (loading || loadingLocations) return <div>Loading...</div>;

  if (error || locationsError) {
    return <div>{error ? error.message : locationsError.message}</div>;
  }

  return (
    <div className="settings-rooms">
      <AddRoom locations={locations} />
      <div className="settings-rooms-list">
        <table>
          <ColGroup />
          <TableHead titles={['Room', 'Location', 'Office', 'Action']} />
          <tbody>
            {allRooms.map(room => (
              <Room
                room={formatRoomData(room)}
                key={room.id}
                locations={locations}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

RoomsList.propTypes = {
  data: PropTypes.shape({
    allRooms: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.object,
  }).isRequired,
  locations: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    })),
    PropTypes.object,
  ]).isRequired,
};

export default compose(
  graphql(GET_ROOMS_QUERY, { name: 'data' }),
  graphql(GET_LOCATIONS_QUERY, { name: 'locations' }),
)(RoomsList);
