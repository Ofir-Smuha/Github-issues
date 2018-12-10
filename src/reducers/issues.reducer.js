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
  SET_LABELS,
  SET_COLLABORATORS,
  SET_ASSIGNEES
} from 'actions/issues.actions';

import type { Issue, Issues } from 'components/issues/issues.types';
import { REMOVE_CURRENT_ISSUE } from '../actions/issues.actions';

const initialState = {
  openIssues: [],
  currentIssue: null,
  issueLabels: null,
  issueComments: [],
  pageCount: 0,
  currentPage: 1,
  issuesState: null,
  sorting: null,
  collaborators: [],
  assignees: []
};

export type IssuesState = {|
  +openIssues: Issues,
  +currentIssue: Issue,
  +issueComments: [],
  +pageCount: number,
  +currentPage: number,
  +issuesState: any,
  +sorting: any,
  +issueLabels: null | [],
  +collaborators: [],
  +assignees: []
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
      flow([
        set('issuesState', initialState.issuesState),
        set('sorting', initialState.sorting)
      ])(state),
    [SET_LABELS]: (state, { payload: { labels } }) =>
      set('issueLabels', labels, state),
    [SET_COLLABORATORS]: (state, { payload: { collaborators } }) => {
      console.log('colab in state', collaborators);
      return set('collaborators', collaborators, state);
    },
    [SET_ASSIGNEES]: (state, { payload: { assignees } }) => {
      console.log('assignees in state', assignees);
      return set('assignees', assignees, state);
    }
  },
  initialState
);
