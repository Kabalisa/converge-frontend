import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import '../../matchMedia.test';
import LoginComponent, { Login } from '../../../src/components/login/Login';

describe('Login component', () => {
  const wrapperCode = (
    <MemoryRouter keyLength={0}>
      <LoginComponent />
    </MemoryRouter>
  );
  const wrapper = mount(wrapperCode);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter keyLength={0}>
        <LoginComponent />
      </MemoryRouter>,
      div,
    );
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the correct the logo image', () => {
    expect(wrapper.find('header>div>img')).toHaveLength(1);
  });

  it('renders login button', () => {
    expect(wrapper.find('.login-btn')).toHaveLength(1);
  });

  it('should call componentWillUnmount when unmounted', () => {
    const loginWrapper = shallow(<Login
      location={{
        state: { errorMessage: 'Something Went Wrong' },
        pathname: '/',
      }}
      history={{ push: jest.fn() }}
    />);
    expect(loginWrapper).toMatchSnapshot();
    expect(loginWrapper.state().loginError).toBe('Something Went Wrong');
  });

  it('should display an error when login error occurs and close snackbar on time out', () => {
    const element = {
      classList: {
        add: jest.fn(),
        remove: jest.fn(),
      },
    };
    jest.spyOn(document, 'querySelector').mockReturnValue(element);

    const push = jest.fn();
    const loginWrapper = mount(<Login
      location={{
        search: '?error=Something%20Went%20Wrong',
        pathname: '/',
      }}
      history={{ push }}
    />);
    expect(loginWrapper).toMatchSnapshot();
    // find the error message and check whether its the expected error message
    expect(loginWrapper.find('Snackbar').length).toBe(1);
    expect(loginWrapper.find('Snackbar').prop('label')).toBe(loginWrapper.state().loginError);
    // call time out function and check whether snackbar closes
    loginWrapper.find('Snackbar').prop('onTimeout')();
    expect(push).toHaveBeenCalled();
    expect(loginWrapper.state().loginError).toBe(null);
    loginWrapper.update();
    expect(loginWrapper.find('Snackbar')).toHaveLength(0);
    expect(loginWrapper).toMatchSnapshot();
  });

  it('should call handleOpenModal', () => {
    const element = {
      classList: {
        add: jest.fn(),
        remove: jest.fn(),
      },
    };
    jest.spyOn(document, 'querySelector').mockReturnValue(element);

    const push = jest.fn();
    const loginWrapper = mount(<Login
      location={{
        search: '?error=Something%20Went%20Wrong',
        pathname: '/',
      }}
      history={{ push }}
    />);
    loginWrapper.instance().handleOpenModal();
    expect(loginWrapper.state().openModal).toBeTruthy();
    expect(loginWrapper.state().closeModal).toBeFalsy();
  });

  it('should call handleCloseModal', () => {
    const element = {
      classList: {
        add: jest.fn(),
        remove: jest.fn(),
      },
    };
    jest.spyOn(document, 'querySelector').mockReturnValue(element);

    const push = jest.fn();
    const loginWrapper = mount(<Login
      location={{
        search: '?error=Something%20Went%20Wrong',
        pathname: '/',
      }}
      history={{ push }}
    />);
    loginWrapper.instance().handleCloseModal();
    expect(loginWrapper.state().openModal).toBeFalsy();
    expect(loginWrapper.state().closeModal).toBeTruthy();
  });
});
