import { createSelector } from 'reselect';

import labelOptions from 'constants/labels.constans';

const userLabelsSelector = state => state.issues.issueLabels;

const labelsSelector = createSelector();
