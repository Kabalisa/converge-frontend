import React from 'react';
import PropTypes from 'prop-types';
import DeleteFloor from "./DeleteFloor"; //eslint-disable-line
import EditFloor from "./EditFloor"; //eslint-disable-line

/**
 * Floor Component
 *
 * @param {Object} floor
 *
 * @returns {JSX}
 */
export const Floor = ({ floor, refetch }) => (
  <tr>
    <td>{floor.name}</td>
    <td>{floor.block}</td>
    <td>
      <EditFloor
        id="edit-modal"
        floorName={floor.name}
        floorId={floor.id}
        floorLocation={floor.office}
      />
      &nbsp;
      <DeleteFloor
        floorName={floor.name}
        id="delete-modal"
        floorId={floor.id}
        refetch={refetch}
      />
    </td>
  </tr>
);

Floor.propTypes = {
  floor: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  refetch: PropTypes.func.isRequired,
};

export default Floor;
