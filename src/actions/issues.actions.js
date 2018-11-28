// @flow
import { apiAction } from 'actions/api.actions';
import { extractLinkFromHeaders } from 'utils/github.utils';

import type { Issues, Issue, Comments } from 'components/issues/issues.actions';
export type Header = {};
export type id = number;

export const FETCH_ISSUES = 'FETCH_ISSUES';
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
export const POST_COMMENT = 'POST_COMMENT';

export const ISSUES_LABEL = 'issues';
export const ISSUE_LABEL = 'issue';
export const COMMENT_LABEL = 'COMMENT_LABEL';

export const fetchIssues = (
  page = 1,
  data = { state: null, sort: null },
  query = { name: 'facebook', repo: 'create-react-app' }
) =>
  apiAction({
    type: FETCH_ISSUES,
    payload: {
      method: 'GET',
      path: `https://api.github.com/repos/${query.name}/${
        query.repo
      }/issues?page=${page}`,
      networkLabel: ISSUES_LABEL,
      onSuccess: setIssues,
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
  query = { name: 'facebook', repo: 'create-react-app', number: 1 }
) =>
  apiAction({
    type: FETCH_ISSUE,
    payload: {
      method: 'GET',
      path: `https://api.github.com/repos/${query.name}/${query.repo}/issues/${
        query.number
      }`,
      networkLabel: ISSUE_LABEL,
      onSuccess: setCurrentIssue,
      issueNumber: query.number
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
      onSuccess: setComments
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

export const postComment = (query: Object, comment: Object, token) =>
  apiAction({
    type: POST_COMMENT,
    payload: {
      path: `https://api.github.com/repos/${query.name}/${query.repo}/issues/${
        query.number
      }/comments?access_token=${token}`,
      method: 'POST',
      data: comment,
      networkLabel: COMMENT_LABEL
    }
  });
