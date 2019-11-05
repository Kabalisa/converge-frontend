/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import {
  getRoomsStructure,
  getRoomId,
  getRoomResources,
} from './QueriesHelpers';

const isResourcesSetup = async (structureRooms) => {
  const roomIds = [];
  for (const room of structureRooms) {
    const roomId = await getRoomId(room.name);
    roomIds.push(roomId.data.getRoomByName[0]);
  }

  let allRoomsResources = [];

  for (const oneRoom of roomIds) {
    try {
      const oneRoomResource = await getRoomResources(oneRoom.id);
      allRoomsResources.push(oneRoomResource);
    } catch (error) {
      allRoomsResources = [[]];
    }
  }
  const levelResources = allRoomsResources
    .map(roomResources => roomResources.length > 0)
    .includes(true);
  return levelResources;
};
const Levels = (structure, level) =>
  structure.map(element => element.level === level).includes(true);
const LevelFilter = (structure, level) =>
  structure.filter(element => element.level === level);
const centerSetupLevel = async () => {
  const centerStructure = await getRoomsStructure();
  const levelOne = Levels(centerStructure.allStructures, 1);
  const levelFloors = Levels(centerStructure.allStructures, 2);
  const levelWings = Levels(centerStructure.allStructures, 3);
  const levelRooms = Levels(centerStructure.allStructures, 4);
  const structureRooms = LevelFilter(centerStructure.allStructures, 4);
  let levelResources;
  if (structureRooms.length) {
    levelResources = await isResourcesSetup(structureRooms);
  }
  // console.log('===========>levelResources', levelResources);
  if (!levelOne) {
    return 'welcomePage';
  }
  if (!levelFloors && !levelWings && !levelRooms && !levelResources) {
    return 'officeStructure';
  }
  if (!levelRooms && !levelResources) {
    return 'addRooms';
  }
  if (!levelResources) {
    return 'addResources';
  }
  return 'centerIsSetup';
};
export default centerSetupLevel;
