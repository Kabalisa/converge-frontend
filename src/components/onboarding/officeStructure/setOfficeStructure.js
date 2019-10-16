/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SelectionDropdown from '../../commons/selectionDropdown';
import BuildingCard from '../../commons/BuildingCard';
import InputsWithAddIcons from '../../commons/AddIconInput/index';
import '../../../assets/styles/officeStructure.scss';

const SetOfficeStructure = ({
  blocks,
  activeBlock,
  handleLeveltype,
  onInputChange,
  toggleBlock,
  levelType,
  backIcon,
}) => (
  <Fragment>
    <div className="structure-title-container">
      {backIcon}
      <span className="structure-title">Office Structure</span>
    </div>
    <span className="set-structure-title">
      Set the structure of your Center
    </span>
    <BuildingCard blocks={blocks} activeBlock={activeBlock} toggleBlock={toggleBlock} />
    <span className="set-structure-labels">Select Level Type for {activeBlock}</span>
    <SelectionDropdown handleLeveltype={handleLeveltype} levelType={levelType} />
    <span className="set-structure-labels">Name your {levelType || 'Level type'}</span>
    <InputsWithAddIcons onInputChange={onInputChange} />
  </Fragment>
);

SetOfficeStructure.propTypes = {
  blocks: PropTypes.array,
  activeBlock: PropTypes.string,
  handleLeveltype: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  toggleBlock: PropTypes.func.isRequired,
  levelType: PropTypes.string.isRequired,
  backIcon: PropTypes.any.isRequired,
};

SetOfficeStructure.defaultProps = {
  blocks: [],
  activeBlock: '',
};

export default SetOfficeStructure;
