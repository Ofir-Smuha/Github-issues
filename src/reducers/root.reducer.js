// @flow
import { combineReducers } from 'redux';

import network from 'reducers/network.reducer';
import localization from 'reducers/localization.reducer'; // TODO: remove if no localization
import issues from 'reducers/issues.reducer';

export const reducersMap = {
  network,
  localization, // TODO: remove if no localization
  issues
};

export default combineReducers(reducersMap);
