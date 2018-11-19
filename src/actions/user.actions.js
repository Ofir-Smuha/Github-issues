import { apiAction } from 'actions/api.actions';

const AUTHENTICATE_USER = 'AUTHENTICATE_USER';

const LOGIN_LABEL = 'login';

export const authUser = () =>
  apiAction({
    type: AUTHENTICATE_USER,
    payload: {
      method: 'GET',
      path:
        'https://github.com/login/oauth/authorize?client_id=6f2d834c1c19457787b&redirect_url=http://localhost:3000',
      networkLabel: LOGIN_LABEL,
      onSuccess: null,
      onError: null,
      handleHeaders: null,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
  });
