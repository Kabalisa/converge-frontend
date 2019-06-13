import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { roomIcon } from '../../../utils/images/images';
import ActionButtons from '../../commons/ActionButtons';
import MrmModal from '../../commons/Modal';
import { assignResourceMutation } from '../../helpers/mutationHelpers/resources';
import MultipleSelect from '../../commons/MultipleSelect';
import '../../../assets/styles/addresource.scss';
import notification from '../../../utils/notification';

/**
 * Add Resource Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
export class AssignResource extends React.Component {
  state = {
    closeModal: false,
  };

  resourceQuantity = React.createRef();
  amenity = React.createRef();

  /**
   * Ensures that the modal for adding a resource closes
   * when a user hits CANCEL on the modal or when the
   * adding a resource is successful
   *
   * @returns {void}
   */
  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  assignResource = (resourceId, rooms) => {
    const { handleOnAssignResource, location, getRooms } = this.props;
    if (!rooms || rooms.length < 1) {
      notification(toastr, 'error', 'Please add a room')();
    } else {
      const promises = rooms.map(roomId =>
        assignResourceMutation({
          resourceId, roomId, location, quantity: 1,
        }));
      this.setState({ fetching: true });
      Promise.all(promises).then(() => {
        this.setState({ fetching: false });
        notification(toastr, 'success', `Resource Successfully assigned to room${rooms[1] ? 's' : ''}`)();
        this.handleCloseModal();
        handleOnAssignResource();
        getRooms();
      }).catch((e) => {
        this.setState({ fetching: false });
        notification(toastr, 'error', e.graphQLErrors
          ? e.graphQLErrors[0].message
          : 'Sorry, there was a problem assigning the resource')();
      });
    }
  };

  updateSelectedRooms = rooms => this.setState({ rooms });

  /**
   * It updates the state value of closeModal
   * to false whenever the modal closes
   *
   * @returns {void}
   */
  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  render() {
    const {
      closeModal,
      fetching,
      rooms,
    } = this.state;
    const { locationRooms, resourceToAssign: { name: resourceName, id: resourceId } } = this.props;
    return (
      <MrmModal
        title={`ASSIGN ${resourceName.toUpperCase()} TO ROOMS`}
        buttonText={<img src={roomIcon} alt="Assign resource to room" />}
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="add-resource-modal assign-resource-modal"
      >
        <form className="amenity-form" onSubmit={this.handleCloseModal}>
          <div>
            <MultipleSelect
              updateRooms={this.updateSelectedRooms}
              label="Select rooms"
              placeholder="Pick rooms"
              options={locationRooms.map(({ id, name }) => ({ value: `${id}__${name}` }))}
              multiple
            />
            <div className="loading-btn-div">
              <ActionButtons
                isLoading={fetching}
                onClickCancel={this.handleCloseModal}
                actionButtonText="SUBMIT"
                onClickSubmit={() => this.assignResource(resourceId, rooms)}
              />
            </div>
          </div>
        </form>
      </MrmModal>
    );
  }
}

AssignResource.propTypes = {
  getRooms: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  locationRooms: PropTypes.instanceOf(Array).isRequired,
  handleOnAssignResource: PropTypes.func.isRequired,
  resourceToAssign: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default AssignResource;
