import { createSelector } from 'reselect';
import { concat, uniqBy } from 'lodash/fp';

import labelOptions from 'constants/labels.constans';

const userLabelsSelector = state => state.issues.issueLabels;
const optionLabelsSelector = () => labelOptions;

const labelsSelector = createSelector(
  [optionLabelsSelector, userLabelsSelector],
  (LabelOptions, userLabels) => {
    console.log('data: ', LabelOptions, userLabels);
    const rawLabels = concat(userLabels, LabelOptions);
    console.log('raw: ', rawLabels);
    const labels = uniqBy('name', rawLabels);
    console.log('lables: ', labels);
    return labels;
  }
);

console.log('done done: ', labelsSelector);

export default labelsSelector;
