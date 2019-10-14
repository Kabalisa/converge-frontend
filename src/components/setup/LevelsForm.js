/* eslint-disable */
import React, { Component } from 'react';
import uuid from 'uuid';
import { Input } from '../commons';
import Button from '../commons/Button';
import Controls from '../helpers/Controls';
import { orderByLevel, removeDeletedLevels, flattenLocationStructureData } from '../../utils/formatSetupData';
import MrmModal from "../commons/MrmModal";
import "../../assets/styles/levelsForm.scss";

class LevelsForm extends Component {
  state = {
    levelCounter: 1,
    levelsDetails: [],
    showDeleteModal: false,
    wrongLevelName: false,
    deleteLevel: null,
    levelName: "",
    nodesToBeDeleted: [],
  };

  componentWillReceiveProps(prevProps) {
    this.props.activeLevel !== prevProps.activeLevel &&
      this.setState({ levelCounter: prevProps.activeLevel });
  }

  deleteModal = React.createRef();

  populateLevelDetails = (val, type, index) => {
    const { levelCounter, levelsDetails } = this.state;
    const { tag, quantity, id, children } = levelsDetails[levelCounter - 1] || {};

    return {
      children: type === 'levelName' ? this.updateChildArray(index, val) : children || [],
      id: id || uuid(),
      level: levelCounter,
      parentId: levelCounter == 1 ? null : '',
      parentTitle: '',
      tag: type === 'levelTagName' ? val : tag || '',
      quantity: type === 'up' ? (val += 1) : type === 'down' && val !== 0 ? (val -= 1) : quantity,
      errorInput: null,
    };
  };

  updateChildArray = (index, val) => {
    const { levelCounter, levelsDetails } = this.state;
    const { children } = levelsDetails[levelCounter - 1] || /* istanbul ignore next */ {};
    let detailsPosition = children;

    const updateObj = () => {
      const arr = detailsPosition;
      arr[index - 1] = {
        name: val,
        structureId: detailsPosition[index - 1].structureId,
        parentId: '',
        id: index,
        parentTitle: '',
        level: levelCounter,
        childError: null,
      };
      return (detailsPosition = arr);
    };

    return !detailsPosition.length
      ? (detailsPosition[index - 1] = [
          {
            name: val,
            structureId: (detailsPosition && detailsPosition.structureId) || uuid(),
            parentId: '',
            id: index,
            parentTitle: '',
            level: levelCounter,
            childError: null,
          },
        ])
      : children.length >= index
        ? updateObj() // modify existing entry
        : /* istanbul ignore next */ [
            ...detailsPosition,
            {
              name: val,
              structureId: uuid(),
              parentId: '',
              id: index,
              parentTitle: '',
              level: levelCounter,
              childError: null,
            },
          ]; // new entry
  };

  /**
   * It cancels the current level setup
   *
   * @param {object} event
   *
   * @returns {void}
   */
  cancelCurrentLevelSetup = (events)=>{
    const{cancelCurrentLevelSetup} = this.props;
    const {levelCounter} = this.state;
    /* istanbul ignore else */
    if(levelCounter>1){
      events.preventDefault();
      cancelCurrentLevelSetup()
    }
  }

  /**
   * It cancels the current level setup
   *
   * @param {int} highestLevel
   *
   * @returns {void}
   */


  handleInputChange = event => {
    event.preventDefault();

    const { levelCounter } = this.state;
    const { name, value, id } = event.target;
    const arr = this.state.levelsDetails;

    arr[levelCounter - 1] = ['up', 'down'].includes(name)
      ? this.populateLevelDetails(
          (arr[levelCounter - 1] && arr[levelCounter - 1].quantity) || 0,
          name,
        )
      : this.populateLevelDetails(value, name, id);

    this.setState({
      levelsDetails: arr,
      errorInput: null,
    });
  };

  removeLevelDetails = (id) => {
    const { levelsDetails } = this.state;
    let structureList = [];
    levelsDetails.forEach((item) =>{
      structureList.push(item.children);
    });
    this.setState({
      structureList,
    });
    let newList = [...levelsDetails].map((obj) => (
      obj.children && obj.children.find((item) => (item.structureId === id))
    )).filter((item) => (item !== undefined));
    this.toggleDeleteModal(newList[0]);
  };

  deleteSetup = (event) => {
    event.preventDefault();
    const { showDeleteModal } = this.state;
    showDeleteModal ? this.deleteLevel(1) : this.deleteLevel()
  };

  deleteLevel = (singleLevel = 0) => {
    let newArray;
    const { previewBuildingStructure, flattenedStruct } = this.props;
    const { deleteLevel, structureList, levelName, levelsDetails } = this.state;
    const { structureId, name } = deleteLevel;
    const structureTree = flattenedStruct.length > 0
      ? flattenedStruct
      : flattenLocationStructureData(levelsDetails);
    const nodesToBeDeleted =  this.deleteTree(structureId, structureList);
    if(singleLevel === 1){
      newArray = removeDeletedLevels(structureTree, nodesToBeDeleted);
      previewBuildingStructure(orderByLevel(newArray), newArray);
      this.toggleDeleteModal();
    } else {
      if (levelName === name) {
        newArray = removeDeletedLevels(structureTree, nodesToBeDeleted);
        previewBuildingStructure(orderByLevel(newArray), newArray);
        this.toggleDeleteModal();
        this.setState({
          levelName: "",
        })
      } else {
        this.setState({
          wrongLevelName: true,
        })
      }
    }
  };

  deleteTree = (parent, list) => {
    const { nodesToBeDeleted } = this.state;
    const newNodesToBeDeleted = [...nodesToBeDeleted].flat();
    const _nodesToBeDeleted = [parent];
    list.forEach(list => {
      list.forEach(node => {
        if (_nodesToBeDeleted.find(id => node.parentId === id))
          _nodesToBeDeleted.push(node.structureId);
      });
    });
    newNodesToBeDeleted.push(_nodesToBeDeleted);
    this.setState({
      nodesToBeDeleted: newNodesToBeDeleted.flat(),
    });
    return _nodesToBeDeleted;
  };

  toggleDeleteModal = (level = {}) => {
    this.deleteModal.current.toggleModal();
    this.setState({
      deleteLevel: level,
    });
  };

  closeDeleteStructureModal = () => {
    this.setState({
      wrongLevelName: false,
      showDeleteModal: false,
      levelName: "",
    })
  };

  handleDeleteName = (event) => {
    this.setState({
      levelName: event.target.value,
      wrongLevelName: false,
    })
  };

  deleteModalContent = () => {
    const { deleteLevel, wrongLevelName, showDeleteModal } = this.state;
    const name = deleteLevel !== null ? deleteLevel.name : "";
    const wrongLevelClass = wrongLevelName !== null ? wrongLevelName :/* istanbul ignore next */"";
    return (
      showDeleteModal ? (
        <p>You are about to delete the level <b>{name}</b>.</p>
      ) : (
        <div>
          <p>You are about to delete a parent level. Please enter the name <b>{name}</b> to delete it</p>
          {wrongLevelClass && /* istanbul ignore next */ <p className='wrongLevelName'>That is not the correct level name please check again.</p>}
          <input
            className="level-delete-modal"
            type="text"
            value={this.state.levelName}
            onChange={this.handleDeleteName}
            readOnly={false}
          />
        </div>
    ));
  };

  toggleParentSelection = (parent, childPosition, type) => () => {
    const { levelCounter, levelsDetails } = this.state;
    const { name, structureId } = parent;
    const levels = levelsDetails;

    levels[levelCounter - 1].children[childPosition - 1].parentId = type === 'add' ? structureId : /* istanbul ignore next */ '';
    levels[levelCounter - 1].children[childPosition - 1].parentTitle = type === 'add' ? name : /* istanbul ignore next */ '';

    this.setState({
      levelsDetails: levels,
    });
  };

  renderParents = index => {
    const { levelsDetails, levelCounter } = this.state;
    const level = levelsDetails[levelCounter - 1] && levelsDetails[levelCounter - 1].children;
    const parentLevels = levelsDetails[levelCounter - 2];
    if (levelCounter != 1) {
      return (
        !level.length || !level[index] || !level[index].parentId
          ? (
            <div className={this.props.missingParent ? /* istanbul ignore next */ this.props.missingParent :'select-parent'}>
              {parentLevels.children.map((parent, i) => (
                <span
                  key={(i + 1).toString()}
                  className="parent-list"
                  onClick={this.toggleParentSelection(parent, index + 1, 'add')}
                >{parent.name}
                </span>
              ))}
              {this.props.missingParent &&/* istanbul ignore next */ this.renderError('Child level must belong to a parent level')}
            </div>)
          : (
            <div className="active-parent">
              <span>{ level[index].parentTitle}</span>
              <span
                className="remove-parent"
                onClick={this.toggleParentSelection(parent, index + 1, 'remove')}
              >x
              </span>
            </div>)
      );
    }
  };

  renderError = (message) => <span className="error-text">{message}</span>;

  displayLevelsInput = ({ levelCounter, levelsDetails }) => {
    const isLevel = (levelsDetails.length && levelsDetails[levelCounter - 1]) || [];
    const { errorInput = [], quantity } = isLevel;
    return (
      [...Array(quantity || 0)].map((ind, index) => {
        const errorChild = isLevel.children[index] && isLevel.children[index].childError;
        const childErrors = errorChild && errorChild.includes('levelName');
        const inputFieldValue = isLevel.children[index] && isLevel.children[index].name;
        const error = !inputFieldValue || childErrors;
        return (
          <div className="form-input" key={index.toString()}>
            {error && /* istanbul ignore next */  this.renderError('This field cannot be blank')}
            <Input
              type="text"
              placeholder="eg. Epic Tower"
              labelName="Level Name"
              key={index + levelCounter}
              id={index + 1}
              inputClass={`level-input ${error && /* istanbul ignore next */ 'error'}`}
              name="levelName"
              value={(isLevel.children[index] && isLevel.children[index].name) || ''}
              onChange={this.handleInputChange}
            />
            {this.renderParents(index)}
          </div>
        );
      })
    );
  };

  addNewObject = () => {};

  render() {
    const { levelCounter, levelsDetails, showDeleteModal } = this.state;
    const details = (levelsDetails.length && levelsDetails[levelCounter - 1]) || {};

    return (
      <form className="level-form">
        <MrmModal
          title="DELETE LEVEL"
          type={2}
          withButton
          showActionButton
          handleCloseModal={this.closeDeleteStructureModal}
          modalContent={this.deleteModalContent()}
          handleSubmit={this.deleteSetup}
          actionButtonText="DELETE"
          ref={this.deleteModal}
        />
        <div className="level-form__input">
          <label>Set a name for this level</label>
          <input
            type="text"
            placeholder="Building"
            onChange={this.handleInputChange}
            name="levelTagName"
            value={details.tag || ''}
            className="level-input"
          />
        </div>
        <div className="level-form__input">
          <label>How many of this level are in your location?</label>
          <input
            type="number"
            placeholder="0"
            onChange={this.handleInputChange}
            name="levelQuantity"
            value={details.quantity || ''}
            className="level-input"
          />
          <Controls controlsClass="num-controls" handleIncrement={this.handleInputChange} />
        </div>
        {this.displayLevelsInput(this.state)}
        <div className="level-button-div">
        <Button handleClick={this.cancelCurrentLevelSetup} title="Back" type={2} classProp="back-button" />
        <Button handleClick={this.props.addNewLevel} title="Save" type={1} classProp="save-button" />
        </div>
      </form>
    );
  }
}

export default LevelsForm;
