import React, { Component } from 'react';
import InputsWithAddIcon from '../../commons/InputAddIcon';
import InputWithNumbers from '../../commons/InputWithNumber';
import '../../../assets/styles/setupRoomsStructure.scss';
import InputField from '../../commons/InputField';
import Button from '../../commons/Button';

class SetupRoomsStructure extends Component {
  state = { }
  render() {
    return (
      <div className="setup-rooms-structure-container">
        <h1 className="setup-rooms-structure-header">
            Awesome, You&apos;re In <span role="img" aria-label="thums-up">👍🏾</span>
        </h1>
        <p className="setup-rooms-structure-subheader">
            Let&apos;s setup the meeting rooms within your location
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

export default SetupRoomsStructure;
