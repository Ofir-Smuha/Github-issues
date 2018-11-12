// @flow
import React from 'react';
import styled from 'styled-components';
import { get } from 'lodash/fp';
import moment from 'moment';

import warning2 from 'assets/images/warning.svg';

import type { Issue } from 'components/issues/issues.types';

type Props = {
  currentIssue: Issue
};

const Header = (props: Props) => {
  const userName = get('user.login', props.currentIssue);
  const { title, number, created_at, comments } = props.currentIssue;

  return (
    <HeaderWrapper>
      <TitleButtonContainer>
        <IssueTitle>
          {title} <Serial>#{number}</Serial>
        </IssueTitle>
        <NewIssueButton>New issue</NewIssueButton>
      </TitleButtonContainer>
      <StatusDetailsContainer>
        <StatusDisplay>
          <StatusIcon />
          <StatusTitle>Open</StatusTitle>
        </StatusDisplay>
        <DetailsContainer>
          <Name>{userName}</Name>
          <OpenedAt> opened this issue {moment(created_at).fromNow()}</OpenedAt>
          <Comments>&middot; {comments} comments</Comments>
        </DetailsContainer>
      </StatusDetailsContainer>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  border-bottom: 1px solid #e6ebf1;
  padding-bottom: 20px;
  margin-top: 20px;
`;

const TitleButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const IssueTitle = styled.div`
  font-size: 28px;
  line-height: 1.125;
  font-weight: 400;
  margin-right: 10px;
  max-width: 80%;
`;

const NewIssueButton = styled.button`
  border: 1px solid rgba(27, 31, 35, 0.2);
  border-radius: 3px;
  font-size: 12px;
  padding: 5px 10px;
  font-weight: bold;
  background-color: #28a745;
  background-image: linear-gradient(-180deg, #34d058, #28a745 90%);
  color: #fff;
  outline: none;
  cursor: pointer;
`;

const Serial = styled.span`
  font-size: 28px;
  line-height: 1.125;
  font-weight: 300;
  color: #a3aab1;
`;

const StatusDetailsContainer = styled.div`
  display: flex;
`;

const StatusDisplay = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 10px;
  font-weight: bold;
  background-color: #28a745;
  background-image: linear-gradient(-180deg, #34d058, #28a745 90%);
  color: #fff;
  border-radius: 3px;
  margin-right: 8px;
`;

const StatusIcon = styled.div`
  background: url(${warning2}) no-repeat center;
  width: 18px;
  height: 18px;
  margin-top: 4px;
  margin-right: 4px;
`;

const StatusTitle = styled.h1`
  font-size: 14px;
`;

const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const Comments = styled.p`
  color: #586069;
  font-size: 14px;
  line-height: 20px;
`;

export default Header;
