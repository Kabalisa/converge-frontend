import React, { Component, Fragment } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import SetupLayout from '../../../containers/SetupLayout';
import SetOfficeStructure from '../../onboarding/officeStructure/setOfficeStructure';
import OfficeStructurePreview from '../../onboarding/officeStructure/officeStructurePreview';
import NextButton from '../../onboarding/officeStructure/nextButton';
import SetupLocationPreview from '../meetingRooms/SetupLocationPreview';
import { getRoomsStructure } from '../../helpers/QueriesHelpers';


class setupOfficeStructure extends Component {
  state = {
    blocks: [],
    activeBlock: '',
    levelType: '',
    LevelTypeNumber: '1',
    LevelTypeName: [
      {
        id: '',
        name: '',
        buildingId: '',
        buildingName: '',
        inputTypeLevel: '',
      },
    ],
    buildingLocationId: '',
  };

  componentDidMount() {
    this.centerBuildings();
  }

  centerBuildings = async () => {
    const centerStructure = await getRoomsStructure();
    const centerBuildings = centerStructure.allStructures.filter(
      structure => structure.level === 1,
    );
    const buildings = centerBuildings.map((building) => {
      const { structureId, name } = building;
      return { structureId, name };
    });
    this.setState({
      blocks: buildings,
      activeBlock: buildings[0].name,
      buildingLocationId: centerBuildings[0].locationId,
    });
  };

  handleLeveltype = (e, { value }) => {
    this.setState({
      levelType: value,
    });
  };

  handleLevelTypeNumber = (newValue) => {
    this.setState({
      LevelTypeNumber: newValue,
    });
  };

  handleLevelTypeName = (e, { id, value }) => {
    const {
      LevelTypeName, blocks, activeBlock, levelType,
    } = this.state;
    const currentBock = blocks.filter(block => block.name === activeBlock);
    const item = LevelTypeName.map(typename => typename.id === id).includes(
      true,
    );

    if (item) {
      const newTypeNames = LevelTypeName.filter(
        itemObject => itemObject.id !== id,
      );
      const typeNamesWithId = LevelTypeName.filter(
        LevelType => LevelType.id === id,
      );
      const activeBlockTypes = typeNamesWithId.filter(
        element => element.buildingName !== activeBlock,
      );

      const updatedTypeName = {
        id,
        name: value,
        buildingId: currentBock[0].structureId,
        buildingName: currentBock[0].name,
        inputTypeLevel: levelType,
      };
      return this.setState({
        LevelTypeName: [...newTypeNames, ...activeBlockTypes, updatedTypeName],
      });
    }
    if (LevelTypeName.length === 1 && LevelTypeName[0].id === '') {
      return this.setState({
        LevelTypeName: [
          {
            id,
            name: value,
            buildingId: currentBock[0].structureId,
            buildingName: currentBock[0].name,
            inputTypeLevel: levelType,
          },
        ],
      });
    }
    return this.setState({
      LevelTypeName: [
        ...LevelTypeName,
        {
          id,
          name: value,
          buildingId: currentBock[0].structureId,
          buildingName: currentBock[0].name,
          inputTypeLevel: levelType,
        },
      ],
    });
  };

  toggleBlock = (block) => {
    this.setState({ activeBlock: block, levelType: '', LevelTypeNumber: '1' });
  };

  handleNext = () => {
    const { LevelTypeName, buildingLocationId } = this.state;

    const flattenedData = [];
    LevelTypeName.map(typeName =>
      flattenedData.push({
        structureId: uuid(),
        name: typeName.name,
        level: 2,
        parentId: typeName.buildingId,
        parentTitle: typeName.buildingName,
        tag: typeName.inputTypeLevel,
        position: 1,
        locationId: buildingLocationId,
      }),
    );
    return flattenedData;
  };
  render() {
    const {
      blocks, activeBlock, LevelTypeNumber, levelType,
    } = this.state;

    const flattenedData = this.handleNext();
    const layoutLeft = (
      <Fragment>
        <SetOfficeStructure
          blocks={blocks}
          activeBlock={activeBlock}
          handleLeveltype={this.handleLeveltype}
          onChangeValue={this.handleLevelTypeNumber}
          inputValue={LevelTypeNumber}
          onInputChange={this.handleLevelTypeName}
          toggleBlock={this.toggleBlock}
          levelType={levelType}
        />
        <NextButton
          flattenedData={flattenedData}
          handleOnClick={this.props.nextPage}
        />
      </Fragment>
    );
    const layoutRight = (
      <Fragment>
        <OfficeStructurePreview />
      </Fragment>
    );
    return (
      <SetupLayout
        layoutRight={<SetupLocationPreview content={layoutRight} />}
        layoutLeft={layoutLeft}
      />
    );
  }
}

setupOfficeStructure.propTypes = {
  nextPage: PropTypes.func.isRequired,
};

export default setupOfficeStructure;
