/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/addroom.scss';

const setClassName = (Floor, activeFloor, block) => {
  const className = `addroom-Floor ${
    Floor === activeFloor
      ? 'addroom-Floor active-Floor'
      : 'addroom-Floor'
  } ${block}`;
  return className;
};
// eslint-disable-next-line react/prop-types
const BuildingCardFloor = ({ Floors, activeFloor, block }) => (
  <div className="addroom-container">
    {Floors.map(Floor => (
      <button className={setClassName(Floor, activeFloor, block)}>{Floor} <div className="addroom-block">{block}</div></button>
    ))}
  </div>
);

BuildingCardFloor.propTypes = {
  Floors: PropTypes.array,
  activeFloor: PropTypes.string,
};

BuildingCardFloor.defaultProps = {
  Floors: [],
  activeFloor: '',
};

export default BuildingCardFloor;
