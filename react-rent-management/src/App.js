import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PropTypes from 'prop-types';
import Core from './pages/Core';
import config from './config';

function App({ store, history }) {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={config.googleClientId}>
        <Router history={history}>
          <Core />
        </Router>
      </GoogleOAuthProvider>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default App;
