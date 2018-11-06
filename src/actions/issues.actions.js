// @flow
import { apiAction } from 'actions/api.actions';

import type { BaseAction } from 'types/redux.types';
import { POSTS_LABEL } from '../sample/sample.actions';

export const FETCH_ISSUES = 'FETCH_ISSUES';
export const SET_ISSUES = 'SET_ISSUES';
export const SET_ERROR = 'SET_ERROR';
export const SET_CURRENT_ISSUE = 'SET_CURRENT_ISSUE';

export const fetchIssues = () =>
  apiAction({
    type: FETCH_ISSUES,
    payload: {
      method: 'GET',
      path: 'https://api.github.com/repos/facebook/create-react-app/issues',
      onSuccess: setIssues,
      onError: setError
    }
  });

export const setIssues = (openIssues: OpenIssues) => ({
  type: SET_ISSUES,
  payload: {
    openIssues
  }
});

export const setCurrentIssue = (issueId): BaseAction => ({
  type: SET_CURRENT_ISSUE,
  payload: {
    issueId: issueId
  }
});

export const setError = (): BaseAction => ({
  type: SET_ERROR,
  payload: {}
});
