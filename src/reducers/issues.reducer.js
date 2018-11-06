import { set } from 'lodash/fp';
import { handleActions } from 'redux-actions';

const initialState = {
  openIssues: [],
  currentIssue: {}
};

export default handleActions(
  {
    SET_ISSUES: (state, { payload }): IssuesState =>
      set('openIssues', payload.openIssues, state),
    SET_CURRENT_ISSUE: (state, { payload }) => {
      const currentIssue = state.openIssues.find(
        issue => issue.id.toString() === payload.issueId
      );
      return set('currentIssue', currentIssue, state);
    }
  },
  initialState
);
