// @flow
import { apiAction } from 'actions/api.actions';

// import type { BaseAction } from 'types/redux.types';
import type { Issues, Comments } from 'components/issues/issues.actions';
export type Header = {};
export type id = number;

export const FETCH_ISSUES = 'FETCH_ISSUES';
export const SET_ISSUES = 'SET_ISSUES';
export const SET_ERROR = 'SET_ERROR';
export const SET_CURRENT_ISSUE = 'SET_CURRENT_ISSUE';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const SET_COMMENTS = 'SET_COMMENTS';
export const REMOVE_COMMENTS = 'REMOVE_COMMENTS';
export const SET_ISSUES_PAGING = 'SET_ISSUES_PAGING';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_SORT_STATE = 'SET_SORT_STATE';
export const SET_SORTING = 'SET_SORTING';
export const RESET_SORTING = 'RESET_SORTING';

export const ISSUES_LABEL = 'issues';

export const fetchIssues = (page = 1, data = { state: null, sort: null }) =>
  apiAction({
    type: FETCH_ISSUES,
    payload: {
      method: 'GET',
      path: `https://api.github.com/repos/facebook/create-react-app/issues?page=${page}`,
      networkLabel: ISSUES_LABEL,
      onSuccess: setIssues,
      onError: setError,
      handleHeaders: setPaging,
      data
    }
  });

export const setIssues = (openIssues: Issues) => ({
  type: SET_ISSUES,
  payload: {
    openIssues
  }
});

export const setPaging = (header: Header) => ({
  type: SET_ISSUES_PAGING,
  payload: {
    header
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
      networkLabel: ISSUES_LABEL,
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

export const setCurrentPage = (currentPage: number) => ({
  type: SET_CURRENT_PAGE,
  payload: {
    currentPage
  }
});

export const setSortStateInState = (issuesState: string) => ({
  type: SET_SORT_STATE,
  payload: {
    issuesState
  }
});

export const setSortingInState = (sorting: string) => ({
  type: SET_SORTING,
  payload: {
    sorting
  }
});

export const ResetIssuesSort = () => ({
  type: RESET_SORTING
});

export const setError = () => ({
  type: SET_ERROR,
  payload: {}
});
