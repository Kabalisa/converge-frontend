import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation } from '@apollo/react-hooks';
import * as styled from './customStyles';
import { ADD_RESOURCE_MUTATION } from '../../../graphql/mutations/AddResourceToRoom';


const InputResources = () => {
  const [fields, setFields] = useState([{ value: '' }]);
  const [createResource] = useMutation(ADD_RESOURCE_MUTATION);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    createResource({ variables: { name: fields } });
    toast.success('Resources added...');
  };

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


export default InputResources;
