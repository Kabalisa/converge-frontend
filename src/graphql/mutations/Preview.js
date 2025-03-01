import gql from 'graphql-tag';

export const ADD_LEVEL_SETUP_MUTATION = gql`
mutation createOfficeStructure($flattenedData: [StructureInputs]!){
  createOfficeStructure(data: $flattenedData){
    structure{
      id
      structureId
      name
      level
      parentId
      parentTitle
      tag
      position
      locationId
    }
  }
}
`;

export const DELETE_OFFICE_STRUCTURE = gql`
  mutation deleteOfficeStructure($structureIds: [String]!){
    deleteOfficeStructure(structureIds: $structureIds){
      structure{
        structureId
        name
        level
        parentId
        parentTitle
        tag
        position
        locationId
      }
    }
  }
`;

export { ADD_LEVEL_SETUP_MUTATION as default };
