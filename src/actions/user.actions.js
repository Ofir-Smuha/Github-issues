import { apiAction } from 'actions/api.actions';

const GET_TOKEN_WITH_CODE = 'ACCESS_USER_WITH_TOKEN';
const GET_USER_DATA_FROM_TOKEN = 'GET_USER_DATA_FROM_TOKEN';

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

export const getUserDataWithToken = ({ token }) =>
  apiAction({
    type: GET_USER_DATA_FROM_TOKEN,
    payload: {
      method: 'GET',
      path: `https://api.github.com/user?access_token=${token}`
    }
  });
