/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Fragment, Component, createRef } from 'react';
import PropTypes from 'prop-types';
import Button from '../commons/Button';
import { walkingIcon, chevronIcon } from '../../utils/images/images';
import MrmModal from '../commons/MrmModal';
import StructurePreviewTree from './StructurePreviewTree';
import { checkboxSlideHTML } from '../commons/CheckboxSlide';

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLevel: '0',
      isChecked: false,
      activeLevelHover: 0,
      activeLevelPagination: 0,
      indexHistory: {},
    };
  }

  /**
   * gets user location id
   *
   *
   * @returns {number}
   */
  getUserLocationId = () => {
    const {
      user: { location },
      allLocations,
    } = this.props;
    const userLocation = allLocations.filter(local => local.name === location);
    return Number(userLocation[0].id);
  };

  structurePreview = createRef();

  toggleModal = () => {
    this.structurePreview.current.toggleModal();
  };

  /**
   *
   * Toggles isChecked state to it's opposite value
   * i.e true to false or vise verser
   *
   * @returns {void}
   */

  toggleCheckbox = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
    this.structurePreview.current.toggleModal();
  };

  /**
   * Make level active on clicking level button
   * and undo on clicking again
   *
   * @param {integer} id
   * @param {string} type
   * @returns {function}
   */
  makeLevelActiveClick = (id, type) => () =>
    this.setState({
      activeLevel: type === 'active' && this.state.activeLevel === '0' ? id : '0',
    });

  /**
   * Make level active on hovering level button
   *
   * @param {integer} id
   * @param {string} type
   * @returns {function}
   */
  makeLevelActiveHover = (id, type) => () =>
    this.setState({
      activeLevelHover: type === 'active' ? id : 0,
    });

  /**
   * updates indices for levels on clicking previous and next buttons
   *
   * @param {object} e
   * @param {integer} index
   * @param {integer} level
   * @param {String} direction
   * @returns {object}
   */
  slide = (e, index, level, direction) => {
    let nextIndex = 0;
    if (direction === 'previous') {
      nextIndex = index - 4;
    } else {
      nextIndex = index + 1;
    }

    this.setState({
      activeLevelPagination: nextIndex,
      indexHistory: { ...this.state.indexHistory, [level]: nextIndex },
    });

    return this.state;
  };

  /**
   * check if there are more highlighted buttons on the next or previous pagination
   *
   * @param {integer} index
   * @param {integer} level
   * @param {object} data
   * @returns {object}
   */
  checkMoreHighlighted = (index, level, data) => {
    const iconClass = {};
    const { activeLevel, activeLevelHover } = this.state;

    for (let i = 0; i < data.length; i += 1) {
      if (
        activeLevel === data[i].parentId ||
        activeLevel === data[i].id ||
        (activeLevelHover === data[i].parentId && activeLevel === '0') ||
        (activeLevelHover === data[i].id && activeLevel === '0')
      ) {
        if (index + 3 < i) {
          iconClass.next = 'highlight-arrow-btn';
        }

        if (index > i) {
          iconClass.previous = 'highlight-arrow-btn';
        }
      }
    }

    return iconClass;
  };

  formatLocationStructureData = () => {
    const locationId = this.getUserLocationId();
    const { locationStructure } = this.props;
    const flattenData = [];
    locationStructure.forEach((structure) => {
      const { tag, level, nameObj } = structure;
      nameObj.forEach((child, i) => {
        const { id, name, parentId } = child;
        flattenData.push({
          structureId: id,
          name,
          level,
          parentId,
          locationId,
          position: i + 1,
          tag,
        });
      });
    });
    return flattenData;
  };

  renderDeleteIcon = (counter, values, data, child) => {
    // -1 if level does not have any child
    const checkLevelChild =
      data[values.level] &&
      data[values.level].nameObj.findIndex(elem => elem.parentId === child.id);
    // show delete icon if level does not have a child or its the current level
    const removeable =
      (counter - 1 === Number(values.level) && checkLevelChild === -1) ||
      (checkLevelChild === -1 || checkLevelChild === undefined);
    return (
      removeable && (
        <button className="remove-level" onClick={this.props.removeLevel(child)}>
          x
        </button>
      )
    );
  };

  /**
   * renders the preview of the new added structure
   * @returns {void}
   */
  renderPreviews = (data, counter) =>
    Object.entries(data).map(([key, values]) => {
      let { activeLevelPagination } = this.state;
      const { indexHistory, activeLevel, activeLevelHover } = this.state;

      const level = Number(key) + 1;
      const levelKey = parseInt(key, 10) + 1;
      const classProp = data.length === level ? 'preview-active-btn' : 'preview-btn';

      if (level in indexHistory) {
        if (activeLevelPagination !== indexHistory[level]) {
          activeLevelPagination = indexHistory[level];
        }
      }

      if (this.state.indexHistory[level] === undefined) activeLevelPagination = 0;

      const paginationIconClass = this.checkMoreHighlighted(
        activeLevelPagination,
        level,
        values.nameObj,
      );

      return (
        <Fragment key={level}>
          {level === 1 ? (
            <p>This is your {values.tag}</p>
          ) : (
            <p> Within {values.tag} you can access</p>
          )}
          <span>
            <div className="preview-levels" id={level}>
              <div className="levels-grp">
                {// identify level
                values.nameObj.map(
                  (child, index) =>
                    ((index >= 0 && index < 4 && activeLevelPagination === 0) ||
                      (activeLevelPagination === index && levelKey === level) ||
                      (activeLevelPagination + 1 === index && levelKey === level) ||
                      (activeLevelPagination + 2 === index && levelKey === level) ||
                      (activeLevelPagination + 3 === index && levelKey === level)) && (
                      <div className="preview-btn-container" key={child.id}>
                        {this.renderDeleteIcon(counter, values, data, child)}
                        {index >= 1 &&
                        activeLevelPagination === index &&
                        values.nameObj.length > 4 ? (
                          <button
                            onClick={e => this.slide(e, index, level, 'previous')}
                            className="arrow__left"
                          >
                            <img
                              src={chevronIcon}
                              className={paginationIconClass.previous}
                              alt="chevron icon"
                            />
                          </button>
                        ) : (
                          ''
                        )}
                        <button
                          className={
                            activeLevel === child.parentId ||
                            activeLevel === child.id ||
                            (activeLevelHover === child.parentId && activeLevel === '0') ||
                            (activeLevelHover === child.id && activeLevel === '0')
                              ? 'highlight-btn'
                              : classProp
                          }
                          onClick={this.makeLevelActiveClick(child.id, 'active')}
                          onMouseEnter={this.makeLevelActiveHover(child.id, 'active')}
                          onMouseLeave={this.makeLevelActiveHover(child.id)}
                        >
                          {child.name.toString()}
                        </button>
                        {(values.nameObj.length > 4 &&
                          index < values.nameObj.length - 1 &&
                          index === activeLevelPagination + 3) ||
                        (values.nameObj.length > 4 && index === 3) ? (
                          <button
                            className="arrow__right"
                            onClick={e => this.slide(e, index, level, 'next')}
                          >
                            <img
                              src={chevronIcon}
                              className={paginationIconClass.next}
                              alt="chevron icon"
                            />
                          </button>
                        ) : (
                          ''
                        )}
                      </div>
                    ),
                )}
              </div>
            </div>
          </span>
        </Fragment>
      );
    });

  render() {
    const { isChecked } = this.state;
    const { counter, locationStructure, handleClick } = this.props;
    const isLocationStructure = locationStructure.length > 0;
    return (
      <div className="form-card preview">
        <MrmModal
          ref={this.structurePreview}
          title="OFFICE STRUCTURE"
          type={2}
          styleClassName="preview-structure-modal"
          modalContent={
            <div>
              <StructurePreviewTree data={locationStructure} />
              <span onClick={this.toggleCheckbox} className="close-structure-preview">
                x
              </span>
            </div>
          }
          withButton={false}
        />
        <div className="switch-view">
          {isLocationStructure && checkboxSlideHTML(isChecked, this.toggleCheckbox)}
        </div>
        <div className="form-area">
          <h4>Preview your structure</h4>
          <p>Click any level to expand</p>
          <span>
            <img src={walkingIcon} alt="walking-icon" />
          </span>
          <div className="structure-preview">
            {isLocationStructure && this.renderPreviews(locationStructure, counter)}
            {isLocationStructure && (
              <div className="save-btn-container">
                <Button title="Save & Submit" handleClick={handleClick('RoomSetupView')} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Preview.propTypes = {
  handleClick: PropTypes.func.isRequired,
  removeLevel: PropTypes.func.isRequired,
  user: PropTypes.shape({}),
  allLocations: PropTypes.instanceOf(Array).isRequired,
  counter: PropTypes.number.isRequired,
  locationStructure: PropTypes.instanceOf(Array).isRequired,
};

Preview.defaultProps = {
  user: {},
};

export default Preview;
