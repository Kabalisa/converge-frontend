/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import InputsWithAddIcon from '../../commons/AddIconInput';
import InputWithNumbers from '../../commons/InputWithNumber';
import '../../../assets/styles/setupLocationStructure.scss';
import InputField from '../../commons/InputField';
import Button from '../../commons/Button';


const SetupLocationStructure = ({
  handleChange, handleClick, buildings, buildingcreated, nextPage,
}) => (
  <div className="setup-location-structure-container">
    <h1 className="setup-location-structure-header">
              Setup Your Location
    </h1>
    <p className="setup-location-structure-subheader">
              Set the structure of your Center
    </p>
    <p className="location-input-label">
                  What&apos;s the name of your Andela Center
    </p>
    <InputField handleChange={handleChange} />
    <p className="buildings-input-label">
                  How many buildings are in your center?
    </p>
    <InputWithNumbers />
    <p className="buildings-names-input-label">
                  Name your buildings
    </p>
    <InputsWithAddIcon onInputChange={buildings} />
    <Button id="NextButton" title="Next" type={3} handleClick={handleClick} />
    {buildingcreated && nextPage('officeStructure')}
  </div>
);

SetupLocationStructure.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  buildings: PropTypes.func.isRequired,
  buildingcreated: PropTypes.any.isRequired,
  nextPage: PropTypes.func.isRequired,
};

export default SetupLocationStructure;

