// @flow
import { get } from 'lodash/fp';
import history from 'utils/history.utils';

import type { Middleware } from 'types/redux.types';

const navigateMiddleware: Middleware = () => {
  return next => action => {
    if (!get('meta.navigate', action)) {
      return next(action);
    }

    history.replace('/login');
  };
};

export default navigateMiddleware;
