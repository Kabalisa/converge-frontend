/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import ActionButton from './ActionButtons';
import IconButtons from './IconButtons';
import getUserDetails from '../helpers/QueryHelper';
import '../../assets/styles/mrmmodal.scss';

class MrmModal extends Component {
  static propTypes = {
    modalContent: PropTypes.node,
    title: PropTypes.string,
    buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    type: PropTypes.number,
    client: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.string,
    ]).isRequired,
  };

  static defaultProps = {
    modalContent: '',
    buttonText: '',
    title: '',
    type: 1,
  };

  state = {
    isOpen: false,
    role: '',
  }

  componentDidMount() {
    this.setUserRole();
  }

  /**
   * Sets the role of the current user
   * @returns {void}
   */
  setUserRole = async () => {
    const user = await getUserDetails(this.props.client);
    this.setState({ role: user.roles[0].id });
  }


  /**
   * Toggle the visibility of the modal
   *
   * @returns {void}
   */
  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const {
      actionButtonText,
      handleSubmit,
      cancelButtonText,
      buttonText,
      title,
      type,
      modalContent,
      isLoading,
      iconButtonClass,
    } = this.props;
    return (
      <div className="modal-component">
        { type === 1 &&
        this.state.role === '2' &&
        <IconButtons
          buttonText={buttonText}
          openModal={this.toggleModal}
          classProp={iconButtonClass}

        />
    }
        {this.state.isOpen &&
          <div className="modal">
            <div className="overlay" />
            <div className="modal_content">
              <h2>{title}</h2>
              {modalContent}
              <ActionButton
                cancelButtonText={cancelButtonText}
                actionButtonText={actionButtonText}
                onClickSubmit={handleSubmit}
                onClickCancel={this.toggleModal}
                isLoading={isLoading}
              />
            </div>
          </div>
        }
      </div>
    );
  }
}

export default withApollo(MrmModal);
