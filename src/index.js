import React from 'react';
import webFont from 'webfontloader';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'react-css-themr';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import apolloClient from './utils/ApolloClient';
import './assets/styles/index.scss';
import ErrorBoundary from './components/commons/ErrorBoundary';

const RTButton = require('react-toolbox/lib/button/theme.css');
const RTDialog = require('react-toolbox/lib/dialog/theme.css');
const RTLink = require('react-toolbox/lib/link/theme.css');
const RTSnackbar = require('react-toolbox/lib/snackbar/theme.css');
const RTDropdown = require('react-toolbox/lib/dropdown/theme.css');

webFont.load({
  google: {
    families: ['Lato'],
  },
});

const contextTheme = {
  RTButton,
  RTDialog,
  RTLink,
  RTSnackbar,
  RTDropdown,
};

ReactDOM.render(
  <ThemeProvider theme={contextTheme}>
    <ApolloProvider client={apolloClient}>
      <ApolloHooksProvider client={apolloClient}>
        <Router>
          <ErrorBoundary isAuthError>
            <App />
          </ErrorBoundary>
        </Router>
      </ApolloHooksProvider>
    </ApolloProvider>
  </ThemeProvider>,
  document.getElementById('root'),
);
