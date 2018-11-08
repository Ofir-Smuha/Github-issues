// @flow
import React from 'react';
import styled from 'styled-components';

import IssuePreview from './IssuePreview';

import type { Issues } from './issues.types';

const List = styled.ul`
  background-color: #f7f8fb;
  // border-left: 4px solid #dcdcdc;
  border: 1px solid #d1d5da;
  border-top: none;
  padding-left: 4px;
`;

const IssuesList = ({ openIssues }: { openIssues: Issues }) => {
  return (
    <List>
      {openIssues.map(openIssue => (
        <IssuePreview key={openIssue.id} openIssue={openIssue} />
      ))}
    </List>
  );
};

export default IssuesList;
