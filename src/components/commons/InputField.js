import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import '../../assets/styles/inputField.scss';

class InputField extends Component {
  state = {
    inputValue: '',
  }

  handleTextChange = ({ value }) => {
    this.setState({
      inputValue: value,
    });
  }
  render() {
    const { placeholder } = this.props;
    const { inputValue } = this.state;
    return (
      <div className="input-field-container">
        <Input
          placeholder={placeholder}
          className="input-field-style"
          value={inputValue}
          onChange={e => this.handleTextChange(e.target)}
        />
      </div>
    );
  }
}

InputField.propTypes = {
  placeholder: PropTypes.string,
};

InputField.defaultProps = {
  placeholder: 'eg Epic Campus',
};

export default InputField;
