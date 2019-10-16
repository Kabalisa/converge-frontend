import React from 'react';
import PropTypes from 'prop-types';
import '../../../assets/styles/setupLocation.scss';


const SetupLocationPreview = ({ content }) => (
  <div className="location-preview">
    <div className="preview-title"> <p className="preview">Preview</p>
      <p className="here-s-a-preview-of">Here is the preview of your setup</p>
    </div>
    <div className="content">
      {content}
    </div>
  </div>
);

SetupLocationPreview.propTypes = {
  content: PropTypes.element.isRequired,
};
export default SetupLocationPreview;
