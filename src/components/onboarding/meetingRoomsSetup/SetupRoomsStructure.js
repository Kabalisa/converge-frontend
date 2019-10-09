import React, { Component } from 'react';
import InputsWithAddIcon from '../../commons/InputAddIcon';
import InputWithNumbers from '../../commons/InputWithNumber';

class SetupRoomsStructure extends Component {
  state = { }
  render() {
    return (
      <div>
        <InputWithNumbers />
        <InputsWithAddIcon />
      </div>
    );
  }
}

export default SetupRoomsStructure;
