/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
import React from 'react';
import { wingLayout } from '../../fixtures/setupInfoPage';
import ImageLoader from '../commons/ImageLoader';
import drowerImage from '../../assets/images/undraw_apartment_rent_o0ut.svg';


const SetupLevel = () => (
  <div className="setup_image">
    <div className="setup_carousel">
      <ImageLoader
        className=""
        source={drowerImage}
        altText="carousel_illustration"
      />
    </div>
    <div className="setup_info">
      <p>{wingLayout.footer}</p>
    </div>
  </div>
);

export default SetupLevel;
