import { set } from 'lodash/fp';
import { handleActions } from 'redux-actions';

import {
  SET_ISSUES,
  SET_CURRENT_ISSUE,
  SET_COMMENTS,
  REMOVE_COMMENTS
} from 'actions/issues.actions';

import type { Issue, Issues } from 'components/issues/issues.types';

const initialState = {
  openIssues: [],
  currentIssue: {},
  issueComments: []
};

export type IssuesState = {|
  +openIssues: Issues,
  +currentIssue: Issue,
  +issueComments: []
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
      set('issueComments', initialState.issueComments, state)
  },
  initialState
);
