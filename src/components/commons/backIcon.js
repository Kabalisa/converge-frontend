/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import backIcon from '../../assets/images/ic_back.svg';

const BackIcon = ({ handleOnClick, page }) => (
  <div className="back_icon" onClick={() => handleOnClick(page)}>
    <img src={backIcon} alt="back icon" />
  </div>
);

BackIcon.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
};

export default BackIcon;
