import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { get } from 'lodash/fp';
import MarkDown from 'react-markdown/with-html';

type Props = {
  context: Object,
  comments: []
};

const IssueComment = (props: Props) => {
  const userName = get('user.login', props.context);
  const { created_at } = props.context;
  return (
    <Wrapper>
      <CommentContainer>
        <UserDetails>
          <Details>
            <Name>{userName}</Name>
            <OpenedAt> commented {moment(created_at).fromNow()}</OpenedAt>
          </Details>
        </UserDetails>
        <CommentBody>
          <MarkDown source={props.context.body} escapeHtml={false} />
        </CommentBody>
      </CommentContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 70%;
  margin-bottom: 20px;
`;

const CommentContainer = styled.div`
  border: 1px solid #d1d5da;
  border-radius: 3px;
`;

const UserDetails = styled.div`
  background-color: #f6f8fa;
  padding: 10px 0;
  display: flex;
  border-bottom: 1px solid #d1d5da;
`;

const Details = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const Name = styled.h1`
  color: #586069;
  font-size: 14px;
  font-weight: 600;
  margin-right: 5px;
`;

const OpenedAt = styled.p`
  color: #586069;
  font-size: 14px;
  line-height: 20px;
  margin-right: 5px;
`;

const CommentBody = styled.div`
  padding: 10px;
`;

export default IssueComment;
