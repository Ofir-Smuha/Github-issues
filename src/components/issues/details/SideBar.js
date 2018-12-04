import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get, size } from 'lodash/fp';
import uuid from 'uuid/v4';

import ListSelect from 'components/common/ListSelect';
import Label from 'components/issues/details/Label';
import labelsSelector from 'selectors/labels.selector';

import gear from 'assets/images/gear.svg';

import type { SideBarIssue } from 'components/issues/issues.types';

type OwnProps = {
  currentIssue: SideBarIssue
};

type ConnectedProps = {
  labels: {}[]
};

type State = {};

class SideBar extends Component<OwnProps & ConnectedProps, State> {
  state = {
    isLabelsOpen: false,
    isAssigneesOpen: false
  };

  renderLabels = () => {
    if (this.props.labels && size(this.props.labels)) {
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

  toggleState = property => {
    this.setState({
      [property]: !this.state[property]
    });
  };

  render() {
    const { projects, assignee } = this.props.currentIssue;
    const assigneeName = get('login', assignee);
    return (
      <Wrapper>
        <AssignContainer>
          <TitleActionsContainer>
            <Title>Assignees</Title>
            <GearIcon onClick={() => this.toggleState('isAssigneesOpen')} />
          </TitleActionsContainer>
          <Info>{assigneeName ? assigneeName : 'No one assigned'}</Info>
        </AssignContainer>
        <LabelsContainer>
          <TitleActionsContainer>
            <Title>Labels</Title>
            <GearIcon onClick={() => this.toggleState('isLabelsOpen')} />
            <ListSelect
              isOpen={this.state.isLabelsOpen}
              items={this.props.labels}
              render={label => <Label key={uuid()} label={label} />}>
              Apply labels to this issue
            </ListSelect>
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

const mapStateToProps = state => ({
  labels: labelsSelector(state)
});

export default connect(mapStateToProps)(SideBar);
