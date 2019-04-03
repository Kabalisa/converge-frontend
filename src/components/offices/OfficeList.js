import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import toastr from 'toastr';
import Office from './Office';
import AddOffice from './AddOffice'; // eslint-disable-line
import '../../assets/styles/officelist.scss';
import '../../assets/styles/table.scss';
import TableHead from '../helpers/TableHead';
import Pagination from '../commons/Pagination';
import notification from '../../utils/notification';
import { GET_ALL_OFFICES } from '../../graphql/queries/Offices';
import MenuTitle from '../commons/MenuTitle';
import Spinner from '../commons/Spinner';
import Overlay from '../commons/Overlay';
import { GET_USER_QUERY } from '../../graphql/queries/People';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import { saveItemInLocalStorage } from '../../utils/Utilities';
import defaultUserRole from '../../fixtures/user';
import DataNotFound from '../commons/DataNotFound';
import ErrorIcon from '../../components/commons/ErrorIcon';

/**
 * Offices List component
 *
 * @param {array} props
 *
 * @returns {JSX}
 */
export class OfficeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allOffices: { ...props.data.allOffices },
      currentPage: 1,
      dataFetched: true, // true when there is an active internet connection.
      isFetching: false,
    };
  }

  componentWillReceiveProps(props) {
    const { allOffices } = props.data;
    this.setState({
      allOffices,
    });
  }

  /**
   * Handles pagination data retrieval.
   *
   * @param {number} page the current page
   * @param {number} perpage the number of items in a page
   *
   * @returns {void}
   */
  handleData = (perPage, page) => {
    this.setState({ isFetching: true });
    /* istanbul ignore next */
    /* Reasoning: find explicit way of testing configuration options */
    this.props.data
      .fetchMore({
        variables: {
          page,
          perPage,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          this.setState({
            allOffices: fetchMoreResult.allOffices,
            currentPage: page,
          });
        },
      })
      .then(() => this.setState({ dataFetched: true, isFetching: false }))
      .catch(() => {
        this.setState({ dataFetched: false, isFetching: false });
        notification(toastr, 'error', 'You seem to be offline, check your internet connection.')();
      });
  };

  render() {
    const { loading, refetch, error } = this.props.data;
    const { user } = this.props.user;
    const {
      allOffices, currentPage, dataFetched, isFetching,
    } = this.state;
    if (error && error.message === 'GraphQL error: No more offices') return <DataNotFound />;
    if (loading) return <Spinner />;

    if (user) saveItemInLocalStorage('access', user.roles[0].id);

    return (
      <div className="settings-offices">
        <div className={`settings-offices-control ${isFetching ? 'disabled-buttons' : null}`}>
          <MenuTitle title="Offices" />
          <AddOffice refetch={refetch} currentPage={currentPage} />
        </div>
        <div className="settings-offices-list">
          {isFetching ? <Overlay /> : null}
          {!error ? (
            <div className="table">
              <TableHead titles={['Office', 'Center', 'Timezone', 'Action']} />
              <div className="table__body">
                {allOffices.offices &&
                  allOffices.offices.map(office => (
                    <Office
                      office={office}
                      key={office.name}
                      refetch={refetch}
                      officeId={office.id}
                      currentPage={currentPage}
                    />
                  ))}
              </div>
            </div>
          ) : (
            <ErrorIcon />
          )}
        </div>
        {!error && (
          <Pagination
            totalPages={allOffices.pages}
            hasNext={allOffices.hasNext}
            hasPrevious={allOffices.hasPrevious}
            handleData={this.handleData}
            currentPage={currentPage}
            dataFetched={dataFetched}
            isFetching={isFetching}
          />
        )}
      </div>
    );
  }
}

OfficeList.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    refetch: PropTypes.func,
    fetchMore: PropTypes.func.isRequired,
    allOffices: PropTypes.shape({
      offices: PropTypes.array,
      pages: PropTypes.number,
    }),
  }),
  user: PropTypes.shape({
    user: PropTypes.object,
  }),
};

OfficeList.defaultProps = {
  data: {
    loading: true,
    allOffices: {
      id: 1,
      name: 'Epic tower',
      location: {
        name: 'Lagos',
        timeZone: 'WEST_AFRICA_TIME',
      },
    },
  },
  user: defaultUserRole,
};

const { UserInfo: userData } = decodeTokenAndGetUserData() || {};

export default compose(
  graphql(GET_ALL_OFFICES, {
    options: () => ({
      /* istanbul ignore next */
      /* Reasoning: no explicit way of testing configuration options */
      variables: {
        page: 1,
        perPage: 5,
      },
    }),
  }),
  graphql(GET_USER_QUERY, {
    name: 'user',
    options: /* istanbul ignore next */ () => ({
      variables: {
        email: process.env.NODE_ENV === 'test' ? 'sammy.muriuki@andela.com' : userData.email,
      },
    }),
  }),
)(OfficeList);
