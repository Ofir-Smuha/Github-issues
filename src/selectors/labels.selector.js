import { createSelector } from 'reselect';
import { concat, uniqBy } from 'lodash/fp';

import labelOptions from 'constants/labels.constans';

const userLabelsSelector = state => state.issues.issueLabels;
const optionLabelsSelector = () => labelOptions;

const labelsSelector = createSelector(
  [optionLabelsSelector, userLabelsSelector],
  (labelOptions, userLabels) => {
    if (!userLabels) {
      return labelOptions;
    }
    const rawLabels = concat(userLabels, labelOptions);
    const labels = uniqBy('name', rawLabels);
    return labels;
  }
);

export default labelsSelector;
