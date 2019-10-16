/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { ADD_LEVEL_SETUP_MUTATION } from '../../../graphql/mutations/Preview';
import GET_ALL_LEVELS from '../../../graphql/queries/Levels';
import Button from '../../commons/Button';
import AddLevelHelper from '../../helpers/addLevel';

const NextButton = ({ flattenedData, handleOnClick, levelType }) => {
  const [addLevel, { loading, error, data }] = useMutation(
    ADD_LEVEL_SETUP_MUTATION,
    {
      update(cache, { data: { addLevels } }) {
        const { allStructures } = cache.readQuery({ query: GET_ALL_LEVELS });
        cache.writeQuery({
          query: GET_ALL_LEVELS,
          data: { allStructures: allStructures.push(addLevels) },
        });
      },
    },
  );

  const AddLevel = () => {
    const InputError = AddLevelHelper(flattenedData, levelType);
    InputError && toast.error(InputError);
    return !InputError ? addLevel({ variables: { flattenedData } }) : null;
  };

  return (
    <div>
      <ToastContainer position={toast.POSITION.TOP_LEFT} />
      <Button
        title={loading ? 'Submitting..' : 'Next'}
        type={3}
        handleClick={AddLevel}
      />
      {error ? <p>ERROR!! TRY AGAIN</p> : ''}
      {data && handleOnClick('addRooms')}
    </div>
  );
};

NextButton.propTypes = {
  flattenedData: PropTypes.array.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  levelType: PropTypes.string,
};

NextButton.defaultProps = {
  levelType: '',
};

export default NextButton;
