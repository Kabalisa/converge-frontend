import React, { Component } from 'react';
import TableHead from '../helpers/TableHead';
import Feedback from './Feedback';
import '../../../src/assets/styles/roomFeedback.scss';
import ErrorIcon from '../../components/commons/ErrorIcon';
import { getRoomFeedbackQuestions, getUserDetails } from '../helpers/QueriesHelpers';
import dummyQuestions from '../../fixtures/roomFeedbackQuestions';
import Overlay from '../commons/Overlay';

/**
 * Component for Room Feedback
 *
 * @returns {JSX}
 */
export class RoomFeedback extends Component {
  state = {
    role: '',
    loading: true,
  };

  componentDidMount() {
    this.setUserRole();
    this.getFeedbackQuestions();
  }

  getFeedbackQuestions = async () => {
    this.setState({ loading: true });
    const feedbackQuestions = await getRoomFeedbackQuestions();
    if (feedbackQuestions) {
      this.setState({ questions: feedbackQuestions.questions });
      this.setState({ loading: false });
    }
  };
  /**
   * Sets the current user's location and role
   *
   * @returns {void}
   */
  setUserRole = async () => {
    const user = await getUserDetails();
    this.setState({ role: user.roles[0].id });
  }

  /**
   * This function computes the duration in weeks
   * basing on the start and end dates
   *
   * @param {date} startDate
   * @param {date} endDate
   *
   * @returns {string}
   */
  durationInWeeks = (startDate, endDate) => {
    const oneDayInMiliSeconds = 1000 * 60 * 60 * 24;
    const startDateInMiliSeconds = parseInt(new Date(startDate).getTime(), 10);
    const endDateInMiliSeconds = parseInt(new Date(endDate).getTime(), 10);
    const differenceInMiliSeconds = parseInt(
      Math.abs(startDateInMiliSeconds - endDateInMiliSeconds),
      10,
    );
    const numberOfDays = differenceInMiliSeconds / oneDayInMiliSeconds;
    if (Math.round(numberOfDays / 7) < 1) {
      if (Math.round(numberOfDays <= 1)) {
        return `${Math.round(numberOfDays)} Day`;
      }
      return `${Math.round(numberOfDays)} Days`;
    }
    if (Math.round(numberOfDays / 7) === 1) {
      return '1 Week';
    }
    return `${Math.round(numberOfDays / 7)} Weeks`;
  };

  /**
   * This function formats the returned date
   *
   * @param {date} startDate
   *
   * @returns {string}
   */
  formatStartDate = (startDate) => {
    const theDate = new Date(startDate).getDate();
    const theMonth = new Date(startDate).toLocaleString(
      'en-us',
      {
        month: 'short',
      },
    );
    const theYear = new Date(startDate).getFullYear();
    const finalDate = `${theDate} ${theMonth}, ${theYear}`;
    return finalDate;
  };

  render() {
    const { loading } = this.state;
    let tableTitles = ['Question', 'Type', 'Responses', 'Start Date', 'Duration'];
    this.state.role === '2' && (tableTitles = [...tableTitles, 'Action', 'Status']);

    const { questions = dummyQuestions } = this.state;

    return (
      <div className="room-feedback">
        <div className="room-feedback__list">
          <div className="table">
            {!questions.length ? (
              <div className="item-list-empty">
                <ErrorIcon message="No questions at the moment" />
              </div>
            ) :
              <TableHead
                titles={[...tableTitles]}
              />}
            <div className="table__body overlay-container">
              {loading && <Overlay id="feedback_overlay" /> }
              <Feedback
                feedback={questions}
                durationFormatter={this.durationInWeeks}
                startDateFormatter={this.formatStartDate}
                role={this.state.role}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RoomFeedback.defaultProps = {
  data: {
    questions: {
      questions: [
        {
          id: '1',
          question: 'There is default question',
          questionType: 'Input',
          startDate: '2019-02-21 23:42:43',
          endDate: '2019-02-21 23:42:43',
          questionResponseCount: 0,
          isActive: false,
        },
      ],
      loading: false,
      error: {},
    },
  },
};

export default RoomFeedback;
