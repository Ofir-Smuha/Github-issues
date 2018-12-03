// @flow
import { get, castArray, compact, has } from 'lodash/fp';

import apiUtils from 'utils/api.utils';
import { startNetwork, endNetwork } from 'actions/network.actions';
import type { ApiAction } from 'actions/api.actions';

import type { Middleware } from 'types/redux.types';

declare var process: any;

// TODO: replace in .env.X to correct URL
export const BASE_URL: string = process.env.REACT_APP_BASE_URL;

const apiMiddleware: Middleware = ({ dispatch, getState }) => {
  const dispatchActions = (actions, data) => {
    compact(castArray(actions)).forEach(action => dispatch(action(data)));
  };

  const searchBlacklistKeys = (body, blacklistKeys) => {
    const keys = compact(castArray(blacklistKeys));
    for (let i = 0; i < keys.length; i++) {
      if (has(keys[i], body)) {
        return true;
      }
    }
    return false;
  };

  return next => action => {
    if (!get('meta.api', action)) {
      return next(action);
    }

    const { payload, meta } = ((action: any): ApiAction);
    const { path, baseUrl, onSuccess, onError, handleHeaders } = payload;
    const { networkLabel, data, method = 'GET' } = payload;
    const headers = {};
    const { blacklistKeys } = meta;
    // const requestUrl = urljoin(baseUrl || BASE_URL, path);
    // TODO: if using token authentication
    // if (getState().user.token) {
    //   headers['auth'] = getState().user.token;
    // }

    next(action);

    dispatch(startNetwork(networkLabel));
    apiUtils
      .request({ method, url: path, data, headers })
      .then(({ body, header, status }) => {
        console.log('PR check');

        console.log('PR check');
        console.log('PR check');
        if (handleHeaders) {
          dispatchActions(handleHeaders, header);
        }
        if (blacklistKeys && searchBlacklistKeys(body, blacklistKeys)) {
          throw new Error('Error 401: Found in blacklist');
        } else if (onSuccess) {
          dispatchActions(onSuccess, body);
        }

        dispatch(endNetwork(networkLabel));
      })
      .catch(error => {
        console.error('API error', error, action);
        if (get('response.status', error) === 401) {
          // TODO: handle 401
          console.error('401', error, action);
        }
        if (onError) {
          dispatchActions(onError, error);
        }
        dispatch(endNetwork(networkLabel));
      });
  };
};

export default apiMiddleware;
