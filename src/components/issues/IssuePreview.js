import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { get } from 'lodash/fp';

import commentIcon from 'assets/images/comments.svg';
import warning from 'assets/images/warning.svg';

const OpenIssueContainer = styled.li`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background-color: #fff;
  margin: 3px;
  min-height: 61px;
  padding: 10px;
  transition: all 300ms;

  &:hover {
    background-color: rgba(203, 250, 255, 0.5);
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

const IssuePreview = props => {
  const userName = get('user.login', props.openIssue);
  const {
    number: issueSerial,
    created_at: openedAt,
    comments,
    title,
    id
  } = props.openIssue;

  return (
    <OpenIssueContainer>
      <IconDescriptionContainer>
        <AlertIcon />
        <IssueDescription>
          <IssueTitle onClick={() => props.history.push(`/issues/${id}`)}>
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

export default withRouter(IssuePreview);
