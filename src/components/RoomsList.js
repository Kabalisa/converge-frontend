import React from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';

import '../assets/styles/roomlist.scss';
import { GET_ROOMS_QUERY, GET_LOCATIONS_QUERY } from '../graphql/queries/Rooms';
import ColGroup from './helpers/ColGroup';
import TableHead from './helpers/TableHead';
import TableBody from './helpers/TableBody';
import Pagination from './commons/Pagination';
import FilterRoomMenu from './rooms/FilterRoomMenu';

import AddRoomMenu from './rooms/AddRoomMenu';

export class RoomsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allRooms: { ...props.data.allRooms },
      noResource: true,
      capacity: 0,
      location: '',
      office: '',
    };
  }

  componentWillReceiveProps(props) {
    const { allRooms } = props.data;
    this.setState({
      allRooms,
    });
  }

  handleNoResource = () => {
    this.setState({
      noResource: false,
    });
  };

  handleResource = () => {
    this.setState({
      noResource: true,
    });
  };

  handleSetState = (location, capacity, office) => {
    this.setState({
      capacity,
      location,
      office,
    });
  };

  handleResetState = () => {
    this.setState({
      capacity: '',
      location: '',
      office: '',
    });
  }

  handleData = (perPage, page) => {
    const { location, capacity, office } = this.state;
    /* istanbul ignore next */
    /* Reasoning: find explicit way of testing configuration options */
    this.props.data.fetchMore({
      variables: {
        page,
        perPage,
        location,
        capacity,
        office,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        this.setState({
          allRooms: fetchMoreResult.allRooms,
        });
      },
    });
  };

  render() {
    const { allRooms, noResource } = this.state;
    const { loading, error } = this.props.data;
    const {
      allLocations: locations,
      loading: loadingLocations,
      error: locationsError,
    } = this.props.locations;

    if (loading || loadingLocations) return <div>Loading...</div>;

    if (error || locationsError) {
      return <div>{error ? error.message : locationsError.message}</div>;
    }

    return (
      <div className="settings-rooms">
        <div className="settings-rooms-control">
          <FilterRoomMenu
            isNoResource={this.handleNoResource}
            isResource={this.handleResource}
            handleSetState={this.handleSetState}
            handleResetState={this.handleResetState}
          />
          <AddRoomMenu />
        </div>
        {noResource ? (
          <div className="settings-rooms-list">
            <table>
              <ColGroup />
              <TableHead titles={['Room', 'Location', 'Office', 'Action']} />
              <TableBody rooms={allRooms.rooms} location={locations} />
            </table>
          </div>
        ) : (
          <h2 style={{ marginLeft: '0' }}>No Rooms Found</h2>
        )}
        { noResource ? (<Pagination
          totalPages={allRooms.pages}
          hasNext={allRooms.hasNext}
          hasPrevious={allRooms.hasPrevious}
          handleData={this.handleData}
        />) : null }
      </div>
    );
  }
}

RoomsList.propTypes = {
  data: PropTypes.shape({
    allRooms: PropTypes.shape({
      rooms: PropTypes.array,
      pages: PropTypes.number,
    }),
    loading: PropTypes.bool,
    error: PropTypes.object,
    fetchMore: PropTypes.func,
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
  graphql(GET_ROOMS_QUERY, {
    name: 'data',
    options: () => ({
      variables: {
        page: 1,
        perPage: 5,
        capacity: 0,
        location: '',
        office: '',
      },
    }),
  }),
  graphql(GET_LOCATIONS_QUERY, { name: 'locations' }),
)(RoomsList);
