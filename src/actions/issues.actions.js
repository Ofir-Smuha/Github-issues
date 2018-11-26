// @flow
import { apiAction } from 'actions/api.actions';
import { extractLinkFromHeaders } from 'utils/github.utils';

// import type { BaseAction } from 'types/redux.types';
import type { Issues, Issue, Comments } from 'components/issues/issues.actions';
export type Header = {};
export type id = number;

export const FETCH_ISSUES = 'FETCH_ISSUES';
export const FETCH_ISSUE_GENERIC = 'FETCH_ISSUE_GENERIC';
export const SET_ISSUES = 'SET_ISSUES';
export const FETCH_ISSUE = 'FETCH_ISSUE';
export const SET_CURRENT_ISSUE = 'SET_CURRENT_ISSUE';
export const REMOVE_CURRENT_ISSUE = 'REMOVE_CURRENT_ISSUE';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const SET_COMMENTS = 'SET_COMMENTS';
export const REMOVE_COMMENTS = 'REMOVE_COMMENTS';
export const SET_ISSUES_PAGING = 'SET_ISSUES_PAGING';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_SORT_STATE = 'SET_SORT_STATE';
export const SET_SORTING = 'SET_SORTING';
export const RESET_SORTING = 'RESET_SORTING';
export const SET_ISSUES_ERROR = 'SET_ISSUES_ERROR';
export const RESET_ERROR = 'RESET_ERROR';

export const ISSUES_LABEL = 'issues';
export const ISSUE_LABEL = 'issue';

export const fetchIssues = (
  page = 1,
  data = { state: null, sort: null },
  search = { name: 'facebook', repo: 'create-react-app' }
) =>
  apiAction({
    type: FETCH_ISSUES,
    payload: {
      method: 'GET',
      path: `https://api.github.com/repos/${search.name}/${
        search.repo
      }/issues?page=${page}`,
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
    header: extractLinkFromHeaders(header)
  }
});

export const fetchIssue = (
  search = { name: 'facebook', repo: 'create-react-app', number: 1 }
) =>
  apiAction({
    type: FETCH_ISSUE,
    payload: {
      method: 'GET',
      path: `https://api.github.com/repos/${search.name}/${
        search.repo
      }/issues/${search.number}`,
      networkLabel: ISSUE_LABEL,
      onSuccess: setCurrentIssue,
      onError: setError,
      issueNumber: search.number
    }
  });

export const setCurrentIssue = (issue: Issue) => ({
  type: SET_CURRENT_ISSUE,
  payload: {
    issue
  }
});

export const removeCurrentIssue = () => ({
  type: REMOVE_CURRENT_ISSUE,
  payload: {}
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
  type: SET_ISSUES_ERROR,
  payload: {}
});

export const resetError = () => ({
  type: RESET_ERROR,
  payload: {}
});
