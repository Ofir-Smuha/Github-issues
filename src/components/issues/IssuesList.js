// @flow
import React from 'react';
import styled from 'styled-components';

import IssuePreview from 'components/issues/IssuePreview';

import type { Issues } from 'components/issues/issues.types';

const List = styled.ul`
  background-color: #f7f8fb;
  border: 1px solid #d1d5da;
  border-top: none;
  padding-top: 3px;
  margin-bottom: 30px;
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
