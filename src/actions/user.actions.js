import { apiAction } from 'actions/api.actions';

export const GET_TOKEN_WITH_CODE = 'GET_TOKEN_WITH_CODE';
export const GET_USER_DATA_FROM_TOKEN = 'GET_USER_DATA_FROM_TOKEN';
export const SAVE_TOKEN_TO_LOCAL_STORAGE = 'SAVE_TOKEN_TO_LOCAL_STORAGE';

const LOGIN_LABEL = 'login';

export const getUserTokenWithCode = (userCode: string) =>
  apiAction({
    type: GET_TOKEN_WITH_CODE,
    payload: {
      method: 'GET',
      path: `https://get-token-github.herokuapp.com/authenticate/${userCode}`,
      networkLabel: LOGIN_LABEL,
      onSuccess: getUserDataWithToken,
      onError: null,
      handleHeaders: null
    }
  });

export const getUserDataWithToken = ({ token }: { token: string }) =>
  apiAction({
    type: GET_USER_DATA_FROM_TOKEN,
    payload: {
      method: 'GET',
      path: `https://api.github.com/user?access_token=${token}`,
      networkLabel: LOGIN_LABEL
    }
  });

export const saveTokenToLocalStorage = ({ token }: { token: string }) => ({
  type: SAVE_TOKEN_TO_LOCAL_STORAGE,
  payload: {
    token
  }
});
