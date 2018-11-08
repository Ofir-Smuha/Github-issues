import { set } from 'lodash/fp';
import { handleActions } from 'redux-actions';

import { SET_ISSUES, SET_CURRENT_ISSUE } from 'actions/issues.actions';

// import type BaseAction from 'types/redux.types'
import type { Issue, Issues } from 'components/issues/issues.types';

const initialState = {
  openIssues: [],
  currentIssue: {}
};

export type IssuesState = {|
  +openIssues: Issues,
  +currentIssue: Issue
|};

export default handleActions(
  {
    [SET_ISSUES]: (state: IssuesState, { payload }): IssuesState =>
      set('openIssues', payload.openIssues, state),
    [SET_CURRENT_ISSUE]: (state: IssuesState, { payload }) => {
      const currentIssue = state.openIssues.find(
        issue => issue.id.toString() === payload.issueId
      );
      return set('currentIssue', currentIssue, state);
    }
  },
  initialState
);
