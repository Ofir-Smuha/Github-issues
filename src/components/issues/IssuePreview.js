// @flow
import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { get } from 'lodash/fp';

import commentIcon from 'assets/images/comments.svg';
import warning from 'assets/images/warning.svg';

import type { Issue } from 'components/issues/issues.types';
import IssueDetails from './details/IssueDetails';

type Props = {|
  openIssue: Issue,
  history: [],
  match: Object
|};

const IssuePreview = (props: Props) => {
  const { name, repo } = props.match.params;
  const userName = get('user.login', props.openIssue);
  const {
    number: issueSerial,
    created_at: openedAt,
    comments,
    title,
    number
  } = props.openIssue;
  return (
    <OpenIssueContainer>
      <IconDescriptionContainer>
        <AlertIcon />
        <IssueDescription>
          <IssueTitle
            onClick={() =>
              props.history.push(`/${name}/${repo}/issues/${number}`)
            }>
            {title}
          </IssueTitle>
          <OpendAt>
            #{issueSerial} opened {moment(openedAt).fromNow()} by {userName}
          </OpendAt>
        </IssueDescription>
      </IconDescriptionContainer>
      <CommentsContainer>
        <CommentIcon />
        <Comments>{comments}</Comments>
      </CommentsContainer>
    </OpenIssueContainer>
  );
};

const OpenIssueContainer = styled.li`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background-color: #fff;
  margin: 0 3px 3px 3px;
  min-height: 61px;
  padding: 10px;
  transition: all 300ms;

  &:hover {
    background-color: #f7f8fb;
  }
`;

const IconDescriptionContainer = styled.div`
  display: flex;
`;

const AlertIcon = styled.div`
  background: url(${warning}) no-repeat center;
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const IssueDescription = styled.div``;

const IssueTitle = styled.h1`
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 18px;
  color: #444;
  max-width: 90%;
  cursor: pointer;

  &:hover {
    color: #0366d6;
  }
`;

const OpendAt = styled.h1`
  font-size: 12px;
  color: #444;
`;

const CommentsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const CommentIcon = styled.div`
  background-image: url(${commentIcon});
  background-repeat: no-repeat;
  background-position: center;
  width: 20px;
  height: 20px;
`;

const Comments = styled.div`
  font-size: 0.9rem;
`;

export default withRouter(IssuePreview);
