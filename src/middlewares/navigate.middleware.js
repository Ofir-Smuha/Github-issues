// @flow
import { get } from 'lodash/fp';
import history from 'utils/history.utils';

import type { Middleware } from 'types/redux.types';

const redirectMiddleware: Middleware = () => {
  return next => action => {
    if (!get('meta.redirect', action)) {
      return next(action);
    }

    history.replace('/login');
  };
};

export default redirectMiddleware;
