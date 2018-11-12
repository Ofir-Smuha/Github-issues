// @flow
import { apiAction } from 'actions/api.actions';

// import type { BaseAction } from 'types/redux.types';
import type { Issues, Comments } from 'components/issues/issues.actions';
export type id = number;
// import { POSTS_LABEL } from '../sample/sample.actions'; what is it made for??

export const FETCH_ISSUES = 'FETCH_ISSUES';
export const SET_ISSUES = 'SET_ISSUES';
export const SET_ERROR = 'SET_ERROR';
export const SET_CURRENT_ISSUE = 'SET_CURRENT_ISSUE';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const SET_COMMENTS = 'SET_COMMENTS';
export const REMOVE_COMMENTS = 'REMOVE_COMMENTS';

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

export const setIssues = (openIssues: Issues) => ({
  type: SET_ISSUES,
  payload: {
    openIssues
  }
});

export const setCurrentIssue = (issueId: id) => ({
  type: SET_CURRENT_ISSUE,
  payload: {
    issueId: issueId
  }
});

export const fetchComments = (commentsURL: string) =>
  apiAction({
    type: FETCH_COMMENTS,
    payload: {
      method: 'GET',
      path: commentsURL,
      onSuccess: setComments,
      onError: setError
    }
  });

export const setComments = (comments: Comments) => ({
  type: SET_COMMENTS,
  payload: {
    comments: comments
  }
});

export const removeComments = () => ({
  type: REMOVE_COMMENTS,
  payload: {}
});

export const setError = () => ({
  type: SET_ERROR,
  payload: {}
});
