import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { get, size, isEmpty, hasIn, compact } from 'lodash/fp';
import uuid from 'uuid/v4';

import ListSelect from 'components/common/ListSelect';
import Label from 'components/common/Label';
import Assignee from 'components/common/Assignee';
import labelsSelector from 'selectors/labels.selector';
import { assigneesSelector } from 'selectors/assignees.selector';
import {
  addLabel,
  deleteLabel,
  addAssignee,
  deleteAssignee
} from 'actions/issues.actions';

import gear from 'assets/images/gear.svg';

import type {
  SideBarIssue,
  IssueLabel,
  OptionLabel
} from 'components/issues/issues.types';

type OwnProps = {
  currentIssue: SideBarIssue
};

type ConnectedProps = {
  labels: OptionLabel[],
  issueLabels: IssueLabel[]
};

type State = {
  isLabelsOpen: boolean,
  isAssigneesOpen: boolean
};

class SideBar extends Component<OwnProps & ConnectedProps, State> {
  state = {
    isLabelsOpen: false,
    isAssigneesOpen: false
  };

  renderAssignees = () => {
    const assignees = this.props.assignees.map(assignee => {
      if (hasIn('isAssignee', assignee)) {
        return (
          <AssigneeContainer key={assignee.id}>
            <AssigneeAvatar avatar={assignee.avatar_url} />
            <AssigneeName>{assignee.login}</AssigneeName>
          </AssigneeContainer>
        );
      }
    });

    if (isEmpty(compact(assignees))) {
      return <Info>No one assigned</Info>;
    }
    return assignees;
  };

  handleAssigneeSelect = assignee => {
    const { repo, name, number } = this.props.match.params;
    const query = {
      repo,
      name,
      number,
      assignees: {
        assignees: [assignee.login]
      }
    };

    if (hasIn('isAssignee', assignee)) {
      this.props.deleteAssignee(query);
    } else {
      this.props.addAssignee(query);
    }
  };

  renderLabels = () => {
    if (size(this.props.issueLabels)) {
      return this.props.issueLabels.map(label => (
        <LabelBar color={label.color} key={label.id}>
          <LabelText>{label.name}</LabelText>
        </LabelBar>
      ));
    }
    return <Info>None yet</Info>;
  };

  handleLabelActionsCall = (params, label) => {
    if (hasIn('default', label)) {
      this.props.deleteLabel(params, label.name);
    } else {
      this.props.addLabel(params, label.name);
    }
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
    const { projects } = this.props.currentIssue;
    return (
      <Wrapper>
        <AssignContainer>
          <TitleActionsContainer>
            <Title>Assignees</Title>
            <GearIcon onClick={() => this.toggleState('isAssigneesOpen')} />
            <ListSelect
              top={'23px'}
              right={'-2px'}
              isOpen={this.state.isAssigneesOpen}
              items={this.props.assignees}
              render={e => (
                <Assignee
                  handleAssigneeSelect={this.handleAssigneeSelect}
                  key={uuid()}
                  assignee={e}
                />
              )}>
              Assign up to 10 people to this issue
            </ListSelect>
          </TitleActionsContainer>
          {this.renderAssignees()}
        </AssignContainer>
        <LabelsContainer>
          <TitleActionsContainer>
            <Title>Labels</Title>
            <GearIcon onClick={() => this.toggleState('isLabelsOpen')} />
            <ListSelect
              top="23px"
              right="-2px"
              isOpen={this.state.isLabelsOpen}
              items={this.props.labels}
              render={label => (
                <Label
                  handleLabelClick={this.handleLabelActionsCall}
                  key={uuid()}
                  label={label}
                />
              )}>
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

const AssigneeContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 5px;
`;

const AssigneeAvatar = styled.div`
  background: url(${({ avatar }) => avatar}) no-repeat center;
  background-size: contain;
  width: 15px;
  height: 15px;
  margin-right: 5px;
`;

const AssigneeName = styled.h3`
  color: #586069;
  font-size: 14px;
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

const LabelBar = styled.div`
  width: 100%;
  background-color: #${({ color }) => color};
  height: 20px;
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 5px;
  }
`;

const LabelText = styled.h3`
  font-size: 12px;
  font-weight: 600;
  margin-left: 5px;
`;

const ProjectsContainer = styled.div`
  border-bottom: 1px solid #e6ebf1;
  padding: 10px 0;
`;

const MilestoneContainer = styled.div`
  padding: 10px 0;
`;

const mapStateToProps = state => ({
  assignees: assigneesSelector(state),
  labels: labelsSelector(state),
  issueLabels: state.issues.issueLabels
});

export default withRouter(
  connect(mapStateToProps, {
    addLabel,
    deleteLabel,
    addAssignee,
    deleteAssignee
  })(SideBar)
);
