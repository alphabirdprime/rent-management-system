/* eslint no-underscore-dangle: "off" */

import React from 'react';
import { createRoot } from 'react-dom/client';
import configureStore, { history } from './redux/configureStore';
import sagas from './redux/sagas';
import App from './App';

const store = configureStore();
sagas.forEach((saga) => store.runSaga(saga));

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <App store={store} history={history} />,
);
