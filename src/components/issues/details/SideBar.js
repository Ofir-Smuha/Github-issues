import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get, size } from 'lodash/fp';
import uuid from 'uuid/v4';

import DropDownContainer from 'components/issues/details/DropDownContainer';
import AssigneesDropDown from 'components/issues/details/AssigneesDropDown';
import LabelsDropDown from 'components/issues/details/LabelsDropDown';
import Label from 'components/issues/details/Label';
import ListSelect from 'components/common/ListSelect';
import labelsSelector from 'selectors/labels.selector';

import gear from 'assets/images/gear.svg';

import type { SideBarIssue } from 'components/issues/issues.types';

type Props = {
  currentIssue: SideBarIssue
};

type OwnState = {
  isLabelsOpen: boolean,
  isAssigneesOpen: boolean
};

class SideBar extends Component {
  renderLabels = () => {
    if (this.props.labels && size(this.props.labelslabels)) {
      return this.props.labels.map(label => (
        <Label key={label.id}>{label.name}</Label>
      ));
    }
    return <Info>None yet</Info>;
  };

  renderProgress = () => {
    if (this.props.milestone) {
      const completed = this.props.milestone.closed_issues;
      const toComplete = this.props.milestone.open_issues;
      const progress = toComplete / completed * 100;
      if (isNaN(progress)) {
        return 0;
      }
      return (
        <div>
          <ProgressContainer>
            <ProgressBar progress={progress} />
          </ProgressContainer>
          <BarTitle target="_blank" href={this.props.milestone.html_url}>
            {this.props.milestone.title}
          </BarTitle>
        </div>
      );
    }
    return <Info>No milestone</Info>;
  };

  handleInputChange = ({ target }) => {
    console.log(target.value);
  };

  render() {
    const { projects, assignee } = this.props.currentIssue;
    const assigneeName = get('login', assignee);
    return (
      <Wrapper>
        <AssignContainer>
          <TitleActionsContainer>
            <Title>Assignees</Title>
            <GearIcon />
            <ListSelect
              items={this.props.labels}
              handleInputChange={this.handleInputChange}
              render={label => <Label key={uuid()} label={label} />}>
              Hello
            </ListSelect>
            {/*<DropDownContainer*/}
            {/*items={[assignee]}*/}
            {/*itemsRenderer={assignees => (*/}
            {/*<AssigneesDropDown assignees={assignees} />*/}
            {/*)}>*/}
            {/*Assign up to 10 people to this issue*/}
            {/*</DropDownContainer>*/}
          </TitleActionsContainer>
          <Info>{assigneeName ? assigneeName : 'No one assigned'}</Info>
        </AssignContainer>
        <LabelsContainer>
          <TitleActionsContainer>
            <Title>Labels</Title>
            <GearIcon />
            {/*<DropDownContainer*/}
            {/*items={labels}*/}
            {/*itemsRenderer={label => <Label labels={labels} />}>*/}
            {/*Apply labels to this issue*/}
            {/*</DropDownContainer>*/}
          </TitleActionsContainer>
          {this.renderLabels()}
        </LabelsContainer>
        <ProjectsContainer>
          <Title>Projects</Title>
          <Info>{projects ? projects : 'None yet'}</Info>
        </ProjectsContainer>
        <MilestoneContainer>
          <Title>Milestone</Title>
          {this.renderProgress()}
        </MilestoneContainer>
        {/*<NotificationsContainer>*/}
        {/*<Title>Notifications</Title>*/}
        {/*<Info />*/}
        {/*</NotificationsContainer>*/}
      </Wrapper>
    );
  }
}

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

// const Label = styled.div`
//   height: 20px;
//   border: 1px solid #ed0700;
//   border-radius: 5px;
//   box-shadow: #ed0700 0px 0px 2px;
//   display: flex;
//   align-items: center;
//   padding-left: 5px;
//   font-size: 12px;
//   font-weight: 600;
//
//   &:not(:last-child) {
//     margin-bottom: 10px;
//   }
// `;

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

const mapStateToProps = state => ({
  labels: labelsSelector(state)
});

export default connect(mapStateToProps)(SideBar);
