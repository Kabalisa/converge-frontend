import React from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/onboardingLayout.scss';

const OnboardingLayout = ({ layoutLeft, layoutRight }) => (
  <div className="layout-container">
    <div className="layout-item-first">
      {layoutLeft}
    </div>
    <div className="layout-item-second">
      {layoutRight}
    </div>
  </div>
);

OnboardingLayout.propTypes = {
  layoutLeft: PropTypes.element.isRequired,
  layoutRight: PropTypes.element.isRequired,
};

export default OnboardingLayout;

