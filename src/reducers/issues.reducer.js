import { set, get, flow } from 'lodash/fp';
import { handleActions } from 'redux-actions';

import {
  SET_ISSUES,
  SET_CURRENT_ISSUE,
  SET_COMMENTS,
  REMOVE_COMMENTS,
  SET_ISSUES_PAGING,
  SET_CURRENT_PAGE,
  SET_SORT_STATE,
  SET_SORTING,
  RESET_SORTING,
  SET_ISSUES_ERROR,
  RESET_ERROR
} from 'actions/issues.actions';

import type { Issue, Issues } from 'components/issues/issues.types';
import { REMOVE_CURRENT_ISSUE } from '../actions/issues.actions';

const initialState = {
  openIssues: [],
  currentIssue: null,
  issueComments: [],
  pageCount: 0,
  currentPage: 1,
  issuesState: null,
  sorting: null,
  error: false
};

export type IssuesState = {|
  +openIssues: Issues,
  +currentIssue: Issue,
  +issueComments: [],
  +pageCount: number,
  +currentPage: number,
  +issuesState: any,
  +sorting: any,
  error: boolean
|};

export default handleActions(
  {
    [SET_ISSUES]: (state: IssuesState, { payload }): IssuesState =>
      set('openIssues', payload.openIssues, state),
    [SET_CURRENT_ISSUE]: (state: IssuesState, { payload: { issue } }) =>
      set('currentIssue', issue, state),
    [REMOVE_CURRENT_ISSUE]: state => set('currentIssue', null, state),
    [SET_COMMENTS]: (state: IssuesState, { payload }) =>
      set('issueComments', payload.comments, state),
    [REMOVE_COMMENTS]: state =>
      set('issueComments', initialState.issueComments, state),
    [SET_ISSUES_PAGING]: (state, { payload }) => {
      const pageCount = get('header.last.page', payload);
      return set('pageCount', +pageCount, state);
    },
    [SET_CURRENT_PAGE]: (state, { payload }) =>
      set('currentPage', payload.currentPage, state),
    [SET_SORT_STATE]: (state, { payload }) =>
      flow([set('issuesState', payload.issuesState), set('currentPage', 1)])(
        state
      ),
    [SET_SORTING]: (state, { payload }) =>
      flow([set('sorting', payload.sorting), set('currentPage', 1)])(state),
    [RESET_SORTING]: state =>
      flow([set('issuesState', null), set('sorting', null)])(state),
    [SET_ISSUES_ERROR]: state => set('error', true, state),
    [RESET_ERROR]: state => set('error', false, state)
  },
  initialState
);
