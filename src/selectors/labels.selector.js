import { createSelector } from 'reselect';
import { uniqBy } from 'lodash/fp';

import labelOptions from 'constants/labels.constans';

const userLabelsSelector = state => state.issues.issueLabels;

const labelsSelector = createSelector([userLabelsSelector], userLabels => {
  if (!userLabels) {
    return labelOptions;
  }
  const labels = [...userLabels, ...labelOptions];

  return uniqBy('name', labels);
});

export default labelsSelector;
