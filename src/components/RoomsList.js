import React from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';

import '../assets/styles/roomlist.scss';
import {
  GET_ROOMS_QUERY,
  GET_LOCATIONS_QUERY,
  GET_ROOM_BY_NAME,
} from '../graphql/queries/Rooms';
import ColGroup from './helpers/ColGroup';
import TableHead from './helpers/TableHead';
import TableBody from './helpers/TableBody';
import Pagination from './commons/Pagination';
import MenuTitle from './MenuTitle';
import FilterRoomMenu from './rooms/FilterRoomMenu';

import AddRoomMenu from './rooms/AddRoomMenu';
import Spinner from './commons/Spinner';

export class RoomsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allRooms: { ...props.data.allRooms },
      noResource: true,
      capacity: 0,
      location: '',
      office: '',
      isSearching: false,
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
  };

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

  handleSearchData = (searchData) => {
    const rooms = { rooms: searchData };
    this.setState({ allRooms: rooms, noResource: true });
  };

  stopSearching = () => {
    this.setState({ isSearching: false });
  };

  startSearching = (roomName) => {
    this.setState({ isSearching: true });

    /* istanbul ignore next */
    this.props.getRoomByName
      .fetchMore({
        variables: { name: roomName },
        updateQuery: (prev, { fetchMoreResult }) => ({ ...fetchMoreResult }),
      })
      .then((result) => {
        if (result.data) {
          this.handleSearchData(result.data.getRoomByName);
        }
      })
      .catch(() => {
        this.setState({ noResource: false });
        this.setState({ isSearching: false });
      });
  };

  render() {
    const { allRooms, noResource, isSearching } = this.state;
    const { loading, error } = this.props.data;
    const {
      allLocations: locations,
      loading: loadingLocations,
      error: locationsError,
    } = this.props.locations;

    if (loading || loadingLocations) return <Spinner />;

    if (locationsError || error) {
      return (
        <div>{locationsError ? locationsError.message : error.message}</div>
      );
    }

    return (
      <div className="settings-rooms">
        <div className="settings-rooms-control">
          <MenuTitle title="Rooms" />
          <FilterRoomMenu
            isNoResource={this.handleNoResource}
            isResource={this.handleResource}
            handleSetState={this.handleSetState}
            handleResetState={this.handleResetState}
            isSearching={this.startSearching}
            stopSearching={this.stopSearching}
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
        {noResource && !isSearching ? (
          <Pagination
            totalPages={allRooms.pages}
            hasNext={allRooms.hasNext}
            hasPrevious={allRooms.hasPrevious}
            handleData={this.handleData}
          />
        ) : null}
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
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
      }),
    ),
    PropTypes.object,
  ]).isRequired,
  getRoomByName: PropTypes.shape({
    fetchMore: PropTypes.func.isRequired,
  }).isRequired,
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
  graphql(GET_ROOM_BY_NAME, {
    name: 'getRoomByName',
    options: () => ({
      variables: {
        name: '',
      },
    }),
  }),
)(RoomsList);
