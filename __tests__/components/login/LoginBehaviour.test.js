/**
 * File tests some behaviour of the LoginComponent
 * Was placed here because mocking files in Login.test.js will make some tests fail
 * And putting these tests at the bottom will raise linting errors
 *
 */
import React from 'react';
import { mount } from 'enzyme';
import '../../matchMedia.test';
import { Login } from '../../../src/components/login/Login';
import { profileIcon } from '../../../src/utils/images/images';

// creating mock names to use
const mockFirstName = 'MockFirstName';
const mockLastName = 'MockLastName';

jest.mock('./../../../src/utils/Utilities');
const utilityFUnctions = require('./../../../src/utils/Utilities');

// mock the method that gets token from local storage and make it return a mock token
utilityFUnctions.getItemFromLocalStorage.mockImplementation(() => 'MOCK_TOKEN');

jest.mock('./../../../src/utils/Cookie');
const cookieFunctions = require('../../../src/utils/Cookie');

describe('Login component', () => {
  const push = jest.fn();
  let loginWrapper;
  beforeEach(() => {
    loginWrapper = mount(<Login location={{ pathname: '/' }} history={{ push }} />);
  });
  it('should redirect to another page when a user successfully logs in and his token decoded', () => {
    // implementing the method mock for decoding user data and make it return mock user data
    cookieFunctions.decodeTokenAndGetUserData.mockImplementation(() => ({
      UserInfo: {
        picture: profileIcon,
        first_name: mockFirstName,
        last_name: mockLastName,
      },
    }));

    expect(push).toHaveBeenCalled();
    expect(loginWrapper).toMatchSnapshot();
  });

  it('should redirect to another page when a token is present in localstorage', () => {
    // create a mock token in the local storage
    expect(push).toHaveBeenCalled();
    expect(loginWrapper).toMatchSnapshot();
  });
});
