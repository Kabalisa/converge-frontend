/* eslint-disable react/jsx-closing-tag-location */
import React, { useState, Fragment } from 'react';
import Button from '../commons/Button';
import SetupLevel from './SetupLevel';
import BuildingLevel from './BuildingLevel';
import SetupOfficeStructure from './OfficeStructure/setupOfficeStructure';
import AddRoom from '../setup/meetingRooms/AddRoom';


const SetupInfoPage = () => {
  const [visiblePage, setVisiblePage] = useState('get started');

  const handleClick = (activePage) => {
    setVisiblePage(activePage);
  };

  const renderSetupPages = (page) => {
    switch (page) {
      case 'get started':
        return (
          <Fragment>
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
                  handleClick={() => handleClick('setupLocation')}
                />
              </div>
            </div>
          </Fragment>
        );
      case 'setupLocation':
        return <BuildingLevel nextPage={handleClick} />;
      case 'officeStructure':
        return <SetupOfficeStructure nextPage={handleClick} />;
      case 'addRooms':
        return <AddRoom nextPage={handleClick} />;
      case 'addResources':
        return <h1>Add Resource</h1>;
      default:
        return <h1>Page not found</h1>;
    }
  };

  return <Fragment>{renderSetupPages(visiblePage)}</Fragment>;
};

export default SetupInfoPage;
