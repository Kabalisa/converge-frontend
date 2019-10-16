import React, { useState } from 'react';
import UUID from 'uuid';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import SetupLocationStructure from './SetupLocationStructure';
import { ADD_LEVEL_SETUP_MUTATION } from '../../../graphql/mutations/Preview';
import { getUserDetails, getAllLocations } from '../../helpers/QueriesHelpers';
import GET_ALL_LEVELS from '../../../graphql/queries/Levels';


const SetupLocation = ({ nextPage }) => {
  const [createOfficeStructure, { data }] = useMutation(
    ADD_LEVEL_SETUP_MUTATION, {
      update(cache, { data: { createOfficeStructures } }) {
        const { allStructures } = cache.readQuery({ query: GET_ALL_LEVELS });
        cache.writeQuery({
          query: GET_ALL_LEVELS,
          data: { allStructures: allStructures.push(createOfficeStructures) },
        });
      },
    });
  const [buildings, setBuildings] = useState([]);
  const [centerName, setCenterName] = useState();
  const handleChange = (value) => {
    setCenterName(value);
  };

  const handleClick = async () => {
    const user = await getUserDetails();
    const allLocations = await getAllLocations();
    const [{ id }] = allLocations.filter(local => local.name === user.location);
    const flattenedData = buildings.map(building => ({
      name: building,
      tag: 'Buildings',
      locationId: id,
      parentId: '',
      parentTitle: centerName,
      level: 1,
      position: 1,
      structureId: UUID(),
    }));
    createOfficeStructure({ variables: { flattenedData } });
  };

  const AddBuilding = (e, { value }) => {
    const values = [...buildings, value];
    setBuildings(values);
  };

  return (<SetupLocationStructure
    handleChange={handleChange}
    handleClick={handleClick}
    buildings={AddBuilding}
    buildingcreated={data}
    nextPage={nextPage}
  />);
};

SetupLocation.propTypes = {
  nextPage: PropTypes.func.isRequired,
};

export default SetupLocation;
