import React from 'react';

import IssueComment from './IssueComment';

import type { Issue, Comments } from 'components/issues/issues.types';

type Props = {
  currentIssue: Issue,
  issueComments: Comments
};

const IssueContent = (props: Props) => {
  if (!props.currentIssue) {
    return null;
  }

  const renderComments = () => {
    if (props.currentIssue.comments) {
      return props.issueComments.map(comment => (
        <IssueComment context={comment} key={comment.id} />
      ));
    }
  };

  return (
    <div>
      <IssueComment context={props.currentIssue} />
      {renderComments()}
    </div>
  );
};

export default IssueContent;
