import React, { Component, Fragment } from 'react';
import SingleInputWithAddIcon from './InputWithPlusIcon';

class InputsWithAddIcons extends Component {
  constructor() {
    super();
    this.textInputs = [<SingleInputWithAddIcon pressed={() => { this.onAddInput(); }} />];
    this.state = {
      displayInputs: this.textInputs,
    };
  }

  onAddInput = () => {
    this.textInputs.push(<SingleInputWithAddIcon pressed={() => { this.onAddInput(); }} />);
    this.setState({
      displayInputs: this.textInputs,
    });
  }
  render() {
    const { displayInputs } = this.state;
    return (
      <Fragment>
        {displayInputs}
      </Fragment>
    );
  }
}
export default InputsWithAddIcons;
