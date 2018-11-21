import { createStore, compose, applyMiddleware } from 'redux';
import { RESTORE_LOCAL_STORAGE_KEY } from 'constants/restore.constants';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import filter from 'redux-storage-decorator-filter';

import rootReducer from 'reducers/root.reducer';
import apiMiddleware from 'middlewares/api.middleware';
import { SAVE_TOKEN_TO_LOCAL_STORAGE } from 'actions/user.actions';

const isDev = process.env.NODE_ENV !== 'production';

const composeEnhancers =
  (isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

let engine = createEngine('auth');

engine = filter(engine, ['whitelisted-key', ['user', 'token']]);

const localStorageMiddleWare = storage.createMiddleware(
  engine,
  [],
  [SAVE_TOKEN_TO_LOCAL_STORAGE]
);

const middlewares = [apiMiddleware, localStorageMiddleWare];

if (isDev) {
  middlewares.push(require('redux-freeze'));
}

const savedState = localStorage.getItem(RESTORE_LOCAL_STORAGE_KEY);

const store = createStore(
  rootReducer,
  ...(savedState && isDev ? [JSON.parse(savedState)] : []),
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
