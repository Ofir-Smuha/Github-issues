// @flow
import React from 'react';
import styled from 'styled-components';

import IssuePreview from './IssuePreview';

const List = styled.ul`
  background-color: #f7f8fb;
  border-left: 4px solid #dcdcdc;
  padding-left: 4px;
`;

const IssuesList = ({ openIssues }: { openIssues: Object[] }) => {
  return (
    <List>
      {openIssues.map(openIssue => (
        <IssuePreview key={openIssue.id} openIssue={openIssue} />
      ))}
    </List>
  );
};

export default IssuesList;
