import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/devicelist.scss';
import TableHead from '../helpers/TableHead';
import Device from './Device';
import dummyDevices from '../../fixtures/devices';
import { getAllDevices, getAllRooms } from '../helpers/QueriesHelpers';
import Overlay from '../commons/Overlay';
import ErrorIcon from '../commons/ErrorIcon';
import Pagination from '../commons/Pagination';
import paginate from '../helpers/FrontendPagination';
import AddDevice from './AddDevice';

/**
 * Device List Component
 *
 * @returns {JSX}
 */
class DeviceList extends Component {
  state = {
    fetching: true,
    devices: [],
    rooms: [],
    perPage: 5,
    currentPage: 1,
  }

  async componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, { currentPage, perPage }) {
    if (
      currentPage !== this.state.currentPage
      || perPage !== this.state.perPage
    ) {
      this.updatePageDetails();
    }
  }

  getData = async () => {
    const { location: { name: location, id } } = this.props;
    const devices = await getAllDevices();
    const { allRooms: { rooms: allRooms } } = await getAllRooms(location);
    const rooms = allRooms.filter(({ locationId }) => locationId === Number(id));
    this.setState({
      devices: [...devices].reverse(),
      rooms,
    });
    this.updatePageDetails();
  }

  deviceComponents = deviceArray =>
    deviceArray.map(device => <Device device={device} key={device.name + device.id} />);


  handlePageChange = (perPageData = 5, currentPageData) => {
    this.setState({
      perPage: Number(perPageData),
      currentPage: Number(currentPageData),
    });
  }

  updatePageDetails = () => {
    const {
      devices, currentPage, fetching, perPage,
    } = this.state;
    const {
      pageContent: paginatedDeviceList, hasNext, hasPrevious, pages,
    } = paginate(devices,
      { currentPage, perPage },
    );

    this.setState({
      paginatedDeviceList,
      hasNext,
      hasPrevious,
      pages,
      ...(fetching && { fetching: false }),
    });
  }
  render() {
    const {
      fetching,
      rooms,
      devices,
      currentPage,
      paginatedDeviceList,
      pages,
      hasNext,
      hasPrevious,
      perPage,
    } = this.state;
    const { location } = this.props;

    const displayPaginator = !fetching
    && !(devices.length < 5 && currentPage === 1);

    return (
      <div className="settings-devices-list overlay-container">
        {fetching && <Overlay />}
        <div className="settings-devices-control" />
        <div className="add-new-resource">
          <AddDevice
            location={location}
            rooms={rooms}
            refetch={this.getData}
          />
        </div>
        {
        !fetching && !devices[0]
          ? (
            <ErrorIcon message="No resource found" />
          ) : (
            <Fragment>
              <div className="table">
                <TableHead titles={['Name', 'Type', 'Date Added', 'Last Seen', 'Location']} />
                <div className="table__body">{this.deviceComponents((
                    fetching ? dummyDevices : paginatedDeviceList
                  ))}
                </div>
              </div>
              {
                displayPaginator &&
                  <div>
                    <Pagination
                      totalPages={pages}
                      hasNext={hasNext}
                      hasPrevious={hasPrevious}
                      handleData={this.handlePageChange}
                      isFetching={fetching}
                      perPage={perPage}
                      currentPage={currentPage}
                    />
                  </div>
              }
            </Fragment>
        )
      }
      </div>
    );
  }
}


DeviceList.propTypes = {
  location: PropTypes.shape({
    name: PropTypes.string,
  }),
};

DeviceList.defaultProps = {
  location: undefined,
};


export default DeviceList;
