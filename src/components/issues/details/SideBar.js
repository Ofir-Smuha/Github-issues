import React from 'react';
import styled from 'styled-components';
import { get, size } from 'lodash/fp';

import IssueAction from 'components/issues/details/IssueAction';

import gear from 'assets/images/gear.svg';

import type { SideBarIssue } from 'components/issues/issues.types';

type Props = {
  currentIssue: SideBarIssue
};

const SideBar = (props: Props) => {
  const { labels, milestone, projects, assignee } = props.currentIssue;
  const assigneeName = get('login', assignee);

  const renderLabels = () => {
    if (labels && size(labels)) {
      return labels.map(label => <Label key={label.id}>{label.name}</Label>);
    }
    return <Info>None yet</Info>;
  };

  const renderProgress = () => {
    if (milestone) {
      const completed = milestone.closed_issues;
      const toComplete = milestone.open_issues;
      const progress = toComplete / completed * 100;
      if (isNaN(progress)) {
        return 0;
      }
      return (
        <div>
          <ProgressContainer>
            <ProgressBar progress={progress} />
          </ProgressContainer>
          <BarTitle target="_blank" href={milestone.html_url}>
            {milestone.title}
          </BarTitle>
        </div>
      );
    }
    return <Info>No milestone</Info>;
  };

  return (
    <Wrapper>
      <AssignContainer>
        <TitleActionsContainer>
          <Title>Assignees</Title>
          <GearIcon />
          <IssueAction>Assign up to 10 people to this issue</IssueAction>
        </TitleActionsContainer>
        <Info>{assigneeName ? assigneeName : 'No one assigned'}</Info>
      </AssignContainer>
      <LabelsContainer>
        <Title>Projects</Title>
        {renderLabels()}
      </LabelsContainer>
      <ProjectsContainer>
        <Title>Projects</Title>
        <Info>{projects ? projects : 'None yet'}</Info>
      </ProjectsContainer>
      <MilestoneContainer>
        <Title>Milestone</Title>
        {renderProgress()}
      </MilestoneContainer>
      {/*<NotificationsContainer>*/}
      {/*<Title>Notifications</Title>*/}
      {/*<Info />*/}
      {/*</NotificationsContainer>*/}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 230px;
`;

const TitleActionsContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const GearIcon = styled.div`
  background: url(${gear}) no-repeat center;
  background-size: contain;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const Title = styled.h1`
  color: #586069;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  margin-bottom: 10px;
`;

const Info = styled.h3`
  color: #586069;
  font-size: 12px;
`;

const Label = styled.div`
  height: 20px;
  border: 1px solid #ed0700;
  border-radius: 5px;
  box-shadow: #ed0700 0px 0px 2px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  font-size: 12px;
  font-weight: 600;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const ProgressContainer = styled.div`
  border-radius: 2px;
  height: 8px;
  background-color: #eaecef;
  margin-bottom: 10px;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${props => props.progress + '%'};
  max-width: 100%;
  background-color: #2cbe4e;
`;

const BarTitle = styled.a`
  color: #586069;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  text-decoration: none;

  &:hover {
    color: #0366d6;
  }
`;

const AssignContainer = styled.div`
  border-bottom: 1px solid #e6ebf1;
  padding-bottom: 10px;
`;

const LabelsContainer = styled.div`
  border-bottom: 1px solid #e6ebf1;
  padding: 10px 0;
`;

const ProjectsContainer = styled.div`
  border-bottom: 1px solid #e6ebf1;
  padding: 10px 0;
`;

const MilestoneContainer = styled.div`
  padding: 10px 0;
`;

const NotificationsContainer = styled.div`
  border-bottom: 1px solid #e6ebf1;
`;

export default SideBar;
