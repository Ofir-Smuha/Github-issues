import React from 'react';

import IssueComment from 'components/issues/details/IssueComment';
import TextSubmitter from 'components/common/TextSubmitter';

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
      <TextSubmitter handleSubmit={props.handleCommentSubmit} />
    </div>
  );
};

export default IssueContent;
