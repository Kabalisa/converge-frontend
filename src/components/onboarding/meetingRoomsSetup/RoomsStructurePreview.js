/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import initialPreviewImage from '../../../assets/images/initialImagePreview.svg';
import '../../../assets/styles/roomsSetupPreview.scss';

class RoomsStructurePreview extends Component {
  render() {
    return (
      <div className="rooms-preview">
        <div className="initial-preview-title">Here is the preview of your setup</div>
        <img src={initialPreviewImage} alt="initial preview when no data" className="initial-preview-image" />
        <div className="initial-preview-bottom-text">Please fill-in details on the left to continue</div>
      </div>
    );
  }
}

export default RoomsStructurePreview;
