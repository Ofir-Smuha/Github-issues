import { set, get, flow } from 'lodash/fp';
import { handleActions } from 'redux-actions';

import {
  SAVE_TOKEN_TO_LOCAL_STORAGE,
  SET_AUTH_ERROR,
  RESET_AUTH_ERROR,
  SET_USER_IN_STATE,
  SET_USER_REPOSITORIES
} from 'actions/user.actions';

const initialState = {
  token: false,
  userInfo: null,
  userRepositories: null,
  badCode: false
};

export type UserState = {|
  +token: boolean | null,
  +badCode: boolean,
  +userInfo: Object | null,
  +userRepositories: Object[] | null
|};

export default handleActions(
  {
    [SAVE_TOKEN_TO_LOCAL_STORAGE]: (
      state: UserState,
      { payload }: { payload: Object }
    ) => set('token', !payload.token ? null : payload.token, state),

    [SET_AUTH_ERROR]: (state: UserState) => set('badCode', true, state),

    [RESET_AUTH_ERROR]: (state: UserState) => set('badCode', false, state),

    [SET_USER_IN_STATE]: (state: UserState, { payload: { user } }) =>
      set('userInfo', user, state),

    [SET_USER_REPOSITORIES]: (state, { payload: { repositories } }) =>
      set('userRepositories', repositories, state)
  },
  initialState
);
