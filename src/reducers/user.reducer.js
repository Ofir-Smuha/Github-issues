import { set, get, flow } from 'lodash/fp';
import { handleActions } from 'redux-actions';
import {
  SAVE_TOKEN_TO_LOCAL_STORAGE,
  SET_USER_IN_STATE
} from 'actions/user.actions';

const initialState = {
  token: null,
  userInfo: {}
};

export type UserState = {|
  +token: any,
  userInfo: Object
|};

export default handleActions(
  {
    [SAVE_TOKEN_TO_LOCAL_STORAGE]: (
      state: UserState,
      { payload }: { payload: Object }
    ) => set('token', payload.token, state),
    [SET_USER_IN_STATE]: (state, { payload: { user } }) =>
      set('userInfo', user, state)
  },
  initialState
);
