import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from 'react-toolbox';
import { withRouter } from 'react-router-dom';
import '../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';
import CustomCarousel from './Carousel';

import ROUTES from '../../utils/routes';
import '../../assets/styles/login.scss';
import { decodeTokenAndGetUserData, getToken } from '../../utils/Cookie';
import Constants from '../../utils/Constants';
import {
  parseQueryString,
  getItemFromLocalStorage,
  saveItemInLocalStorage,
} from '../../utils/Utilities';
import logo from '../../assets/images/converge-logo.svg';
import Button from '../commons/Button';
import LoginModal from './LoginModal';

// destructor constants to be used
const {
  MRM_TOKEN,
  MESSAGES: { defaultLoginError },
} = Constants;

/**
 * The login component.
 *
 * @extends Component
 *
 * @returns {JSX}
 */
export class Login extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string,
      state: PropTypes.object,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    loginError: null,
    openModal: false,
    closeModal: true,
    slideAutoplay: true,
  };

  /**
   * Gets the derived state from the props
   *
   * @param {array} props
   *
   * @returns {void}
   */
  static getDerivedStateFromProps = (props) => {
    const { push } = props.history;
    const token = getItemFromLocalStorage(MRM_TOKEN);
    const activeTab =
      sessionStorage.getItem('activeTopNav') || ROUTES.analytics;
    // this logic has been placed in this lifecycle method to avoid rendering of
    // the login page UI if a user is already loggedin
    // if user is logged in
    if (token) {
      // redirect user to settings page
      push(activeTab);
    }
    // returning null since no state updates
    return null;
  };

  componentDidMount = () => {
    const { push } = this.props.history;

    // parse cookie to see if a user has been succesfully logged in by the Andela login api
    const tokenFromCookies = getToken();
    // decode token to get user data
    const data = decodeTokenAndGetUserData();
    if (data && 'UserInfo' in data) {
      // save token to local storage
      saveItemInLocalStorage(MRM_TOKEN, tokenFromCookies);
      // redirect user to settings page
      push(ROUTES.settings);
      return; // avoid execution of error handling if no errors occur
    }

    // handle login errors from the Andela API if they occur
    const { search = '', state: locationState } = this.props.location;
    const queryParameters = parseQueryString(search) || {};
    if ('error' in queryParameters) {
      this.handleLoginError();
    }
    // handle errors that occur when a user tries to access a protected page
    if (locationState && 'errorMessage' in locationState) {
      this.handleLoginError(locationState.errorMessage);
    }
  };

  /**
   * shows login error
   *
   * @returns {void}
   */
  handleLoginError = (loginError = defaultLoginError) => {
    this.setState({ loginError });
  };

  /**
   * It closes the snack bar and redirects to home page
   *
   * @returns {void}
   */
  handleSnackBarClose = () => {
    this.setState({ loginError: null });
    this.props.history.push(ROUTES.home);
  };

  handleOpenModal = () => {
    this.setState({ openModal: true, closeModal: false, slideAutoplay: false });
  }

  handleCloseModal = () => {
    this.setState({ openModal: false, closeModal: true, slideAutoplay: true });
  }

  render() {
    const { loginError } = this.state;
    const { openModal, closeModal, slideAutoplay } = this.state;
    return (
      <Fragment>
        <LoginModal
          openModal={openModal}
          closeModal={closeModal}
          handleCloseModal={this.handleCloseModal}
        />
        <header className="landing-page-header">
          <div className="header-logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="login-btn">
            {openModal || <Button
              classProp="trigger-login-modal"
              title="Login"
              handleClick={this.handleOpenModal}
            />}
          </div>
        </header>
        <CustomCarousel
          legendPosition={openModal ? 'legend-left' : 'legend-center'}
          autoplay={slideAutoplay}
        />

        {/* display login errors */}
        {loginError && (
          <Snackbar
            type="cancel"
            action="Dismiss"
            label={loginError}
            timeout={Constants.ERROR_TIMEOUT}
            active={Boolean(loginError)}
            onTimeout={this.handleSnackBarClose}
            onClick={this.handleSnackBarClose}
            theme={{ snackbar: 'error-theme', button: 'button-error' }}
          />
        )}
      </Fragment>
    );
  }
}

export default withRouter(Login);
