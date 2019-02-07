import { apiAction } from 'actions/api.actions';

export const GET_TOKEN_WITH_CODE = 'GET_TOKEN_WITH_CODE';
export const GET_USER_DATA_FROM_TOKEN = 'GET_USER_DATA_FROM_TOKEN';
export const SAVE_TOKEN_TO_LOCAL_STORAGE = 'SAVE_TOKEN_TO_LOCAL_STORAGE';
export const SET_USER_IN_STATE = 'SET_USER_IN_STATE';
export const FETCH_USER_REPOSITORIES = 'FETCH_USER_REPOSITORIES';
export const SET_USER_REPOSITORIES = 'SET_USER_REPOSITORIES';
export const NAVIGATE = 'NAVIGATE';

const LOGIN_LABEL = 'login';
const REPOSITORIES_LABEL = 'fetch-repositories';

export const getUserTokenWithCode = (userCode: string) =>
  apiAction({
    type: GET_TOKEN_WITH_CODE,
    payload: {
      method: 'GET',
      path: `https://get-token-github.herokuapp.com/authenticate/${userCode}`,
      networkLabel: LOGIN_LABEL,
      onSuccess: [
        user => getUserInfoWithToken(user.token),
        user => saveTokenToLocalStorage(user.token)
      ],
      onError: () => navigateTo('/login')
    },
    meta: {
      blacklistKeys: ['error']
    }
  });

export const getUserInfoWithToken = (token: string) =>
  apiAction({
    type: GET_USER_DATA_FROM_TOKEN,
    payload: {
      method: 'GET',
      path: `https://api.github.com/user?access_token=${token}`,
      networkLabel: LOGIN_LABEL,
      onSuccess: setUserInState
    }
  });

export const saveTokenToLocalStorage = (token = null) => ({
  type: SAVE_TOKEN_TO_LOCAL_STORAGE,
  payload: {
    token
  }
});

export const setUserInState = (user: Object) => ({
  type: SET_USER_IN_STATE,
  payload: {
    user
  }
});

export const navigateTo = (url: string) => ({
  type: NAVIGATE,
  payload: { url },
  meta: { redirect: true }
});

export const fetchUserRepositories = repositoriesUrl =>
  apiAction({
    type: FETCH_USER_REPOSITORIES,
    payload: {
      method: 'GET',
      path: repositoriesUrl,
      networkLabel: REPOSITORIES_LABEL,
      onSuccess: setUserRepositories
    }
  });

export const setUserRepositories = repositories => ({
  type: SET_USER_REPOSITORIES,
  payload: {
    repositories
  }
});
