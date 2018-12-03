// @flow
import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { get } from 'lodash/fp';

import commentIcon from 'assets/images/comments.svg';
import warning from 'assets/images/warning.svg';

import type { Issue } from 'components/issues/issues.types';

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
  const openedAtWithMoment = moment(openedAt).fromNow();
  return (
    <OpenIssueContainer>
      <IconDescriptionContainer>
        <AlertIcon />
        <IssueDescription>
          <TitleLabelContainer>
            <IssueTitle
              onClick={() =>
                props.history.push(`/${name}/${repo}/issues/${number}`)
              }>
              {title}
            </IssueTitle>
          </TitleLabelContainer>
          <OpendAt>
            #{issueSerial} opened {openedAtWithMoment} by {userName}
          </OpendAt>
        </IssueDescription>
      </IconDescriptionContainer>
      <CommentsLabelsContainer>
        <CommentContainer>
          <CommentIcon />
          <Comments>{comments}</Comments>
        </CommentContainer>
        <LabelsContainer>
          {props.openIssue.labels.map(label => (
            <Label color={label.color}>{label.name}</Label>
          ))}
        </LabelsContainer>
      </CommentsLabelsContainer>
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
  max-width: 70%;
`;

const AlertIcon = styled.div`
  background: url(${warning}) no-repeat center;
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const IssueDescription = styled.div``;

const TitleLabelContainer = styled.div`
  display: flex;
`;

const IssueTitle = styled.h3`
  display: inline-block;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 18px;
  color: #444;
  cursor: pointer;

  &:hover {
    color: #0366d6;
  }
`;

const OpendAt = styled.h1`
  font-size: 12px;
  color: #444;
`;

const CommentsLabelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
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

const LabelsContainer = styled.div`
  display: flex;
`;

const Label = styled.span`
  font-size: 12px;
  font-weight: 600;
  height: 20px;
  padding: 2px 4px;
  border-radius: 2px;
  background-color: #${({ color }) => color};

  &:not(:last-child) {
    margin-right: 5px;
  }
`;

export default withRouter(IssuePreview);
