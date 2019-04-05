import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import '../../assets/styles/averageMeetinglist.scss';
import TableHead from '../helpers/TableHead';
import QueryAnalyticsPerMeetingRoom from './AverageMeetingList/QueryAnalyticsPerMeetingRoom';
import Tip from '../commons/Tooltip';
import MEETING_DURATION_ANALYTICS from '../../graphql/queries/analytics';
import Pagination from '../commons/Pagination';
import QueryAnalyticsLoading from './AverageMeetingList/QueryAnalyticsLoading';
import Overlay from '../commons/Overlay';
import { notFoundIcon } from '../../utils/images/images';
import ErrorIcon from '../commons/ErrorIcon';

/**
 * Component for the average meeting list
 *
 * @param {array} props
 *
 * @returns {JSX}
 */
export class AverageMeetingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      analyticsForMeetingsDurations: {
        ...props.data.analyticsForMeetingsDurations,
      },
      isFetching: false,
    };
  }

  componentWillReceiveProps(props) {
    const { analyticsForMeetingsDurations } = props.data;
    this.setState({
      analyticsForMeetingsDurations,
    });
  }

  componentDidUpdate() {
    const { queryCompleted, data: { error, loading } } = this.props;
    if (!error && !loading) {
      queryCompleted('AverageMeetingList');
    }
  }

  /**
   * fetches data for the given number of pages
   *
   * @param {number} perPage
   * @param {number} page
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
          startDate: this.props.dateValue.validatedStartDate,
          endDate: this.props.dateValue.validatedEndDate,
          page,
          perPage,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          this.setState({
            analyticsForMeetingsDurations: fetchMoreResult.analyticsForMeetingsDurations,
          });
        },
      })
      .then(() => this.setState({ isFetching: false }))
      .catch(() => this.setState({ isFetching: false }));
  };

  showErrorMessage = message => (
    <div className="average-table-error">
      <div className="error_class">
        <img
          className="error_icon"
          src={notFoundIcon}
          alt="error_icon"
        />
        <b>
          <p className="error_msg">
            {message || 'An error occurred, cannot fetch data'}
          </p>
        </b>
      </div>
    </div>
  );
  render() {
    const tip =
     'The number of meetings in a room,  the average number of attendees to these meetings as well as the average duration of the meetings.';
    /* eslint no-param-reassign: "error" */
    const { analyticsForMeetingsDurations, isFetching } = this.state;
    const { loading, error } = this.props.data;
    const { isFutureDateSelected } = this.props.dateValue;
    if (loading) return <QueryAnalyticsLoading />;
    const { updateParent } = this.props;
    updateParent('averageMeetingTime', analyticsForMeetingsDurations);
    return (
      <div className="average-meeting">
        <div className="average-meeting-control">
          <h4 className="header-title">Average time spent/Meeting Room</h4>
          <span className="moreVerticalIcon">{Tip(tip)}</span>
        </div>
        <div className="average-meeting-list">
          {isFetching ? <Overlay id="average-meeting" /> : null}
          <div>
            <TableHead
              titles={['Room', 'No. of meetings', 'Average Meeting Duration']}
            />
            <div>
              {
                isFutureDateSelected ?
                this.showErrorMessage('You cannot fetch data beyond today')
                : (
                error ? (
                  <ErrorIcon
                    message={error.graphQLErrors.length > 0 && 'No resource found'}
                  />
                )
                : <QueryAnalyticsPerMeetingRoom
                  data={analyticsForMeetingsDurations}
                />
                )
              }
            </div>
          </div>
        </div>
        <div className="average-meeting-pagination">
          <div>
            { !isFutureDateSelected && !error && <Pagination
              totalPages={analyticsForMeetingsDurations.pages}
              hasNext={analyticsForMeetingsDurations.hasNext}
              hasPrevious={analyticsForMeetingsDurations.hasPrevious}
              handleData={this.handleData}
              isFetching={isFetching}
            />
           }
          </div>
        </div>
      </div>
    );
  }
}

AverageMeetingList.propTypes = {
  dateValue: PropTypes.shape({
    validatedStartDate: PropTypes.string,
    validatedEndDate: PropTypes.string,
    isFutureDateSelected: PropTypes.bool.isRequired,
  }),
  data: PropTypes.shape({
    analyticsForMeetingsDurations: PropTypes.object,
    fetchMore: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.any,
  }).isRequired,
  queryCompleted: PropTypes.func.isRequired,
  updateParent: PropTypes.func,
};

AverageMeetingList.defaultProps = {
  dateValue: {},
  updateParent: null,
};

export default compose(
  graphql(MEETING_DURATION_ANALYTICS, {
    name: 'data',
    options: props => ({
      variables: {
        startDate: props.dateValue.validatedStartDate,
        endDate: props.dateValue.validatedEndDate,
        page: 1,
        perPage: 5,
      },
    }),
  }),
)(AverageMeetingList);
