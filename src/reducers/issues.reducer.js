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
  SET_ASSIGNEES,
  SET_NEW_ISSUE,
  SET_REPO_ASSIGNEES,
  SET_ISSUES_PARAMETERS,
  SET_SEARCHED_REPOS
} from 'actions/issues.actions';

import type { Issue, Issues } from 'components/issues/issues.types';
import { REMOVE_CURRENT_ISSUE } from '../actions/issues.actions';

const initialState = {
  openIssues: [],
  issuesParameters: '',
  currentIssue: null,
  issueLabels: null,
  issueComments: [],
  pageCount: 0,
  currentPage: 1,
  issuesState: null,
  sorting: null,
  collaborators: [],
  assignees: [],
  repoAssignees: [],
  searchedRepos: []
};

export type IssuesState = {|
  +openIssues: Issues,
  +issuesParameters: string,
  +currentIssue: Issue,
  +issueComments: [],
  +pageCount: number | null,
  +currentPage: number,
  +issuesState: any,
  +sorting: any,
  +issueLabels: null | [],
  +collaborators: [],
  +assignees: [],
  +repoAssignees: [],
  +searchedRepos: []
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
      return set('pageCount', !pageCount ? null : parseInt(pageCount), state);
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
    [SET_COLLABORATORS]: (state, { payload: { collaborators } }) =>
      set('collaborators', collaborators, state),
    [SET_ASSIGNEES]: (state, { payload: { assignees } }) =>
      set('assignees', assignees, state),
    [SET_REPO_ASSIGNEES]: (state, { payload: { assignees } }) =>
      set('repoAssignees', assignees, state),
    [SET_ISSUES_PARAMETERS]: (state, { payload: { parameters } }) =>
      set('issuesParameters', parameters, state),
    [SET_SEARCHED_REPOS]: (state, { payload }) =>
      set('searchedRepos', payload.repos.items, state)
  },
  initialState
);
