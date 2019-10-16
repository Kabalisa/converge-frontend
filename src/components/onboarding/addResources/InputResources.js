import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/react-hooks';
import * as styled from './customStyles';
import { ADD_RESOURCE_MUTATION } from '../../../graphql/mutations/AddResourceToRoom';
import GET_ALL_LEVELS from '../../../graphql/queries/Levels';
import { GET_SPECIFIC_ROOMS } from '../../../graphql/queries/Rooms';
import { ASSIGN_RESOURCE_MUTATION } from '../../../graphql/mutations/resources';


const InputResources = ({ handleOnClick }) => {
  const [fields, setFields] = useState([{ value: '' }]);
  const [runAssign, setRunAssing] = useState(false);
  const [createResource, { data }] = useMutation(ADD_RESOURCE_MUTATION);
  const [assignResource, { data: assignData }] = useMutation(ASSIGN_RESOURCE_MUTATION);

  const {
    data: { allStructures },
  } = useQuery(GET_ALL_LEVELS);

  const {
    data: { allRooms },
  } = useQuery(GET_SPECIFIC_ROOMS);

  const structureRooms = allStructures ? allStructures.filter(item => item.level === 4) : [{}];

  const room = allRooms && allRooms.rooms.find(item => item.name === structureRooms[0].name);
  const handleChange = (index, e) => {
    const values = [...fields];
    values[index].value = e.target.value;
    setFields(values);
  };

  const addResource = () => {
    const values = [...fields];
    values.push({ value: '' });
    setFields(values);
  };

  const handleRemove = (index) => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };
  const assignResourceToRoom = () => {
    data && assignResource({
      variables: {
        resourceId: data.createResource.resource.id,
        quantity: 1,
        roomId: room.id,
      },
    });
    setRunAssing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createResource({ variables: { name: fields } });
    toast.success('Resources added...');
  };

  (data && !runAssign) && assignResourceToRoom();

  assignData && handleOnClick('InputResources');
  return (
    <div>
      <ToastContainer position={toast.POSITION.TOP_LEFT} />
      <styled.TextParagraphTwo> Resources Allocated to this Room.</styled.TextParagraphTwo>
      {fields.map((field, idx) => (
        <div key={field.id}>
          <styled.InputResource
            id="inputResources"
            name="inputResources"
            fluid
            type="text"
            placeholder="Jabra speakers"
            value={field.value || ''}
            onChange={e => handleChange(idx, e)}
            icon={<Icon id="remove-resource" data-testid="custom-element" name="close" onClick={() => handleRemove(idx)} link />}
          />
        </div>
      ))}
      <styled.ButtonInputResources id="submit-resource" testID="submit-resource" onClick={() => addResource()} basic fluid>
        Add a Resource <styled.IconBtn name="plus" id="remove-resource" />
      </styled.ButtonInputResources>
      <styled.BtnFinish id="handle-submit" onClick={e => handleSubmit(e)} title="Finish" />
    </div>
  );
};

InputResources.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
};

export default InputResources;
