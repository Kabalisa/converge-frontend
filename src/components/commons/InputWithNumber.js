/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import NumberInput from 'semantic-ui-react-numberinput';
import PropType from 'prop-types';
import '../../assets/styles/inputWithNumbers.scss';

class InputWithNumbers extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '1',
    };
  }
  onChangeValue = (newValue) => {
    this.setState({
      inputValue: newValue,
    });
    this.props.updateOuterInputs(newValue);
  }
  render() {
    const { inputValue } = this.state;
    return (
      <div className="number-input-container">
        <NumberInput
          value={inputValue}
          onChange={this.onChangeValue}
          buttonPlacement="right"
          className="number-input"
        />
      </div>
    );
  }
}
export default InputWithNumbers;

InputWithNumbers.protoTypes = {
  updateOuterInputs: PropType.func,
};

InputWithNumbers.defaultProps = {
  updateOuterInputs: () => {},
};
