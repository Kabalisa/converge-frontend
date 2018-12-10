import React from 'react';
import RoomFeedbackResponse from './RoomFeedbackResponse';
import '../../../src/assets/styles/roomFeedbackResponseList.scss';
import roomFeedbackResponse from '../../fixtures/roomFeedbackResponse';
import RoomFeedbackCard from './RoomFeedbackResponseCard';
import RoomFeedbackFilterButton from './RoomFeedbackFilterButton';
import LocationInput from './LocationInput';
import ExportButton from './ExportButton';

// maps over the list of feedback and returns each one of them
const roomFeedbackItems = roomFeedbackResponse.map(feedback => (
  <RoomFeedbackResponse roomFeedbackResponse={feedback} key={feedback.id} />
));

/**
 * Represents a list of feedback
 * @returns {JSX}
 * @constructor
 */
const RoomFeedbackResponseList = () => (
  <div >
    <RoomFeedbackCard />
    <nav id="feedback-nav">
      <LocationInput />
      <section className="feedback-menu-buttons">
        <RoomFeedbackFilterButton />
        <ExportButton />
      </section>
    </nav>
    <header className="room-feedback-list-container">
      <span>Meeting Room</span>
      <span>Responses</span>
      <span>Cleanliness Rating</span>
      <span>Missing Items</span>
      <span>Suggestion on how to improve</span>
    </header>
    {roomFeedbackItems}
  </div>
);

export default RoomFeedbackResponseList;

