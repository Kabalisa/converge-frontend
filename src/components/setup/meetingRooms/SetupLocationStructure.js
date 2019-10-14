import React, { Component } from 'react';
import InputsWithAddIcon from '../../commons/InputAddIcon';
import InputWithNumbers from '../../commons/InputWithNumber';
import '../../../assets/styles/setupLocationStructure.scss';
import InputField from '../../commons/InputField';
import Button from '../../commons/Button';

class SetupLocationStructure extends Component {
  state = { }
  render() {
    return (
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
        <InputField />
        <p className="buildings-input-label">
            How many buildings are in your center?
        </p>
        <InputWithNumbers />
        <p className="buildings-names-input-label">
            Name your buildings
        </p>
        <InputsWithAddIcon />
        <Button title="Next" type={3} />
      </div>
    );
  }
}

export default SetupLocationStructure;
