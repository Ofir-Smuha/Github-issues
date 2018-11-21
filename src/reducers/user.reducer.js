import { set, get, flow } from 'lodash/fp';
import { handleActions } from 'redux-actions';
import { SAVE_TOKEN_TO_LOCAL_STORAGE } from 'actions/user.actions';

const initialState = {
  token: null
};

export type UserState = {|
  +token: any
|};

export default handleActions(
  {
    [SAVE_TOKEN_TO_LOCAL_STORAGE]: (
      state: UserState,
      { payload }: { payload: Object }
    ) => set('token', payload.token, state)
  },
  initialState
);
