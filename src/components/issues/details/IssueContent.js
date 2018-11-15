import React from 'react';

import IssueComment from 'components/issues/details/IssueComment';

import type { Issue, Comments } from 'components/issues/issues.types';

type Props = {
  currentIssue: Issue,
  issueComments: Comments
};

const IssueContent = (props: Props) => {
  if (!props.currentIssue) {
    return null;
  }

  console.log(props);

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
