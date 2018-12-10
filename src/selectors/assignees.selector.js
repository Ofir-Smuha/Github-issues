import { createSelector } from 'reselect';
import { concat, uniqBy, isEmpty } from 'lodash/fp';

const issueAssigneesSelector = state => state.issues.assignees;
const collaboratorsSelector = state => state.issues.collaborators;

export const assigneesSelector = createSelector(
  [issueAssigneesSelector, collaboratorsSelector],
  (issueAssignees, collaborators) => {
    if (isEmpty(issueAssignees) && isEmpty(collaborators)) {
      return [];
    }

    let newIssueAsignees = [];

    if (!isEmpty(issueAssignees)) {
      newIssueAsignees = issueAssignees.map(assignee => ({
        ...assignee,
        isAssignee: true
      }));
    }

    const rawAssignees = [...newIssueAsignees, ...collaborators];

    return uniqBy('login', rawAssignees);
  }
);
