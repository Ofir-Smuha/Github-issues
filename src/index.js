//@flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Mimic from 'mimic';

import 'index.scss';

import App from 'components/app';
import store from './store';
// import registerServiceWorker from './register-service-worker';

// TODO: change to app name
Mimic.setAppName('Github-issues');

if (process.env.NODE_ENV === 'development') {
  require('components/debug/debug-menu');
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();
