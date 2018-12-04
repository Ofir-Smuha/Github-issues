import { createSelector } from 'reselect';
import { concat, uniqBy } from 'lodash/fp';

import labelOptions from 'constants/labels.constans';

const userLabelsSelector = state => state.issues.issueLabels;
const optionLabelsSelector = () => labelOptions;

const labelsSelector = createSelector(
  [optionLabelsSelector, userLabelsSelector],
  (LabelOptions, userLabels) => {
    if (!userLabels) {
      return LabelOptions;
    }
    const rawLabels = concat(userLabels, LabelOptions);
    const labels = uniqBy('name', rawLabels);
    return labels;
  }
);

export default labelsSelector;
