import React from 'react';
import PropTypes from 'prop-types';
import Button from '../commons/Button';
import SetupLevel from './SetupLevel';

const SetupInfoPage = ({ handleClick }) => (
  <div className="setup_container">
    <div className="message">
      <h1 className="setup"> Setup</h1>
      <p className="configure-andela-cen">Configure Andela centres</p>
    </div>
    <div className="setup_container_center">
      <SetupLevel />
      <Button
        title="Get Started"
        classProp="setup_continue_button"
        handleClick={handleClick('BuildingLevel')}
      />
    </div>
  </div>
);

SetupInfoPage.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default SetupInfoPage;
