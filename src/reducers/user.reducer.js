import { set, get, flow } from 'lodash/fp';
import { handleActions } from 'redux-actions';

import {
  SAVE_TOKEN_TO_LOCAL_STORAGE,
  SET_AUTH_ERROR,
  RESET_AUTH_ERROR,
  SET_USER_IN_STATE
} from 'actions/user.actions';

const initialState = {
  token: null,
  userInfo: {},
  badCode: false
};

export type UserState = {|
  +token: boolean | null,
  +badCode: boolean,
  userInfo: Object
|};

export default handleActions(
  {
    [SAVE_TOKEN_TO_LOCAL_STORAGE]: (
      state: UserState,
      { payload }: { payload: Object }
    ) => set('token', payload.token, state),
    [SET_AUTH_ERROR]: (state: UserState) => set('badCode', true, state),
    [RESET_AUTH_ERROR]: (state: UserState) => set('badCode', false, state),
    [SET_USER_IN_STATE]: (state: UserState, { payload: { user } }) =>
      set('userInfo', user, state)
  },
  initialState
);
