/* eslint-disable import/first */
import React from 'react';
import { shallow } from 'enzyme';
import uuid from 'uuid';

import SetupOfficeStructure from '../../../../src/components/setup/OfficeStructure/setupOfficeStructure';

jest.mock('../../../../src/components/helpers/QueriesHelpers');

import { getRoomsStructure } from '../../../../src/components/helpers/QueriesHelpers';

getRoomsStructure.mockImplementation(() => ({
  allStructures: [
    {
      id: '313',
      structureId: '7ddaeca4-d0b8-4675-9fa2-15ad68449cad',
      level: 1,
      name: 'X-Space',
      parentId: '',
      parentTitle: 'Kigali',
      tag: 'Buildings',
      locationId: 10,
      position: 1,
      state: 'StateType.active',
    }],
}));

describe('setupOfficeStructure Component', () => {
  const wrapper = shallow(<SetupOfficeStructure />);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('calls the handleLevelTypeNumber method', () => {
    const instance = wrapper.instance();
    const { handleLevelTypeNumber } = instance;
    handleLevelTypeNumber('2');
    expect(wrapper.state().LevelTypeNumber).toEqual('2');
  });
  it('calls the handleLeveltype method', () => {
    const instance = wrapper.instance();
    const { handleLeveltype } = instance;
    const handleLeveltypeObj = {
      value: 'value',
    };
    handleLeveltype(null, handleLeveltypeObj);
    expect(wrapper.state().levelType).toEqual('value');
  });
  it('calls the handleLevelTypeName method default case', () => {
    const instance = wrapper.instance();
    const { handleLevelTypeName } = instance;
    const handleLevelTypeNameObj = {
      id: uuid(),
      value: 'value',
    };
    wrapper.setState({
      blocks: [{ structureId: uuid(), name: 'active' }],
      activeBlock: 'active',
      LevelTypeName: [
        {
          id: uuid(),
          name: 'name',
          buildingId: uuid(),
          buildingName: 'buildingName',
          inputTypeLevel: 'inputTypeLevel',
        },
      ],
      buildingLocationId: 100,
    });
    handleLevelTypeName(null, handleLevelTypeNameObj);
  });
  it('calls the handleLevelTypeName method initial case', () => {
    const instance = wrapper.instance();
    const { handleLevelTypeName } = instance;
    const handleLevelTypeNameObj = {
      id: uuid(),
      value: 'value',
    };
    wrapper.setState({
      blocks: [{ structureId: uuid(), name: 'active' }],
      activeBlock: 'active',
      LevelTypeName: [
        {
          id: '',
          name: '',
          buildingId: '',
          buildingName: '',
          inputTypeLevel: '',
        },
      ],
      buildingLocationId: 100,
    });
    handleLevelTypeName(null, handleLevelTypeNameObj);
  });
  it('calls the handleLevelTypeName method first case', () => {
    const instance = wrapper.instance();
    const { handleLevelTypeName } = instance;
    const commonId = uuid();
    const handleLevelTypeNameObj = {
      id: commonId,
      value: 'value',
    };
    wrapper.setState({
      blocks: [{ structureId: uuid(), name: 'active' }],
      activeBlock: 'active',
      LevelTypeName: [
        {
          id: commonId,
          name: 'name',
          buildingId: uuid(),
          buildingName: 'buildingName',
          inputTypeLevel: 'inputTypeLevel',
        },
      ],
      buildingLocationId: 100,
    });
    handleLevelTypeName(null, handleLevelTypeNameObj);
  });
  it('calls the toogleblock method', () => {
    const instance = wrapper.instance();
    const { toggleBlock } = instance;
    const block = 'anotherBlock';
    toggleBlock(block);
    expect(wrapper.state().activeBlock).toEqual('anotherBlock');
  });
});
