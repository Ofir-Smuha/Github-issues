import { apiAction } from 'actions/api.actions';

const AUTHENTICATE_USER = 'AUTHENTICATE_USER';

const LOGIN_LABEL = 'login';

export const authUser = userCredentials =>
  apiAction({
    type: AUTHENTICATE_USER,
    payload: {
      method: 'GET',
      path: 'https://api.github.com/user',
      networkLabel: LOGIN_LABEL,
      onSuccess: null,
      onError: null,
      handleHeaders: null,
      data: userCredentials
    }
  });
