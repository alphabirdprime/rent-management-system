/* eslint no-underscore-dangle: "off" */

import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';
import createRootReducer from './reducers';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(preloadedState) {
  const composeEnhancer = import.meta.env.REACT_APP_STAGE !== 'prod'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;
  const store = createStore(
    createRootReducer(),
    preloadedState,
    composeEnhancer(
      applyMiddleware(sagaMiddleware),
    ),
  );
  store.runSaga = sagaMiddleware.run;
  return store;
}
