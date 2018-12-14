/* eslint react/no-array-index-key: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import CheckboxSlide from './commons/CheckboxSlide';
import EditFeedback from './EditFeedback';
import DeleteFeedback from './DeleteFeedback';

const Feedback = props => (
  props.feedback.map(({
    question,
    startDate,
    duration,
    responses,
    type,
    status,
  }, index) => (
    <tr key={index}>
      <td>{question}</td>
      <td>{type}</td>
      <td>{responses}</td>
      <td>{startDate}</td>
      <td>{duration}</td>
      <td>
        <EditFeedback
          id="edit-modal"
          question={question}
          type={type}
          startDate={startDate}
          duration={duration}
        />
        <DeleteFeedback id="delete-modal" question={question} />
      </td>
      <td><CheckboxSlide checked={status} /></td>
    </tr>
  ))
);

Feedback.propTypes = {
  feedback: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Feedback;
