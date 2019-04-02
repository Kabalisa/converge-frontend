import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { deleteIcon, editIcon } from '../../utils/images/images';

class IconButtons extends Component {
  static propTypes = {
    buttonText: PropTypes.oneOfType(
      [PropTypes.string, PropTypes.object],
    ).isRequired,
    modalButtonClassName: PropTypes.string,
    openModal: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    modalButtonClassName: 'button',
    disabled: false,
  };

  /**
   * Fires an event when the text on a reusable button changes
   *
   * @param {string} text
   *
   * @returns {string}
   */
  onButtonTextChange = (text) => {
    let buttonText;
    if (text === 'Delete') {
      buttonText = <img src={deleteIcon} alt="Delete" />;
    } else if (text === 'Edit') {
      buttonText = <img src={editIcon} alt="Edit" />;
    } else {
      buttonText = text;
    }
    return buttonText;
  };
  render() {
    const { buttonText, modalButtonClassName, disabled } = this.props;
    return (
      <button
        id="modal-button"
        className={modalButtonClassName}
        onClick={this.props.openModal}
        disabled={disabled}
      >
        {this.onButtonTextChange(buttonText)}
      </button>
    );
  }
}

export default IconButtons;
