import { set, get } from 'lodash/fp';
import { handleActions } from 'redux-actions';

import {
  SET_ISSUES,
  SET_CURRENT_ISSUE,
  SET_COMMENTS,
  REMOVE_COMMENTS
} from 'actions/issues.actions';

import type { Issue, Issues } from 'components/issues/issues.types';
import { SET_ISSUES_PAGING } from '../actions/issues.actions';

const initialState = {
  openIssues: [],
  currentIssue: {},
  issueComments: [],
  pageCount: 0
};

export type IssuesState = {|
  +openIssues: Issues,
  +currentIssue: Issue,
  +issueComments: [],
  +pageCount: number
|};

export default handleActions(
  {
    [SET_ISSUES]: (state: IssuesState, { payload }): IssuesState =>
      set('openIssues', payload.openIssues, state),
    [SET_CURRENT_ISSUE]: (state: IssuesState, { payload }) => {
      const currentIssue = state.openIssues.find(
        issue => issue.id.toString() === payload.issueId
      );
      return set('currentIssue', { ...currentIssue }, state);
    },
    [SET_COMMENTS]: (state: IssuesState, { payload }) =>
      set('issueComments', payload.comments, state),
    [REMOVE_COMMENTS]: state =>
      set('issueComments', initialState.issueComments, state),
    [SET_ISSUES_PAGING]: (state, { payload }) => {
      const pageCount = get('header.last.page', payload);
      return set('pageCount', +pageCount, state);
    }
  },
  initialState
);
