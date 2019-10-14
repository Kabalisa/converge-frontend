import React from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/setupLayout.scss';

const SetupLayout = ({ layoutLeft, layoutRight }) => (
  <div className="setup-container">
    <div className="setup-item-first">
      {layoutLeft}
    </div>
    <div className="setup-item-second">
      {layoutRight}
    </div>
  </div>
);

SetupLayout.propTypes = {
  layoutLeft: PropTypes.element.isRequired,
  layoutRight: PropTypes.element.isRequired,
};

export default SetupLayout;
