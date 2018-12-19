import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import uuid from 'uuid/v4';
import { get, size, isEmpty, map, values } from 'lodash/fp';

import ListSelect from 'components/common/ListSelect';
import Assignee from 'components/common/Assignee';
import Label from 'components/common/Label';
import labelsOptions from 'constants/labels.constans';

import { fetchCollaborators } from 'actions/issues.actions';

import gear from 'assets/images/gear.svg';

type Props = {
  handleSetValues: () => Object
};

type State = {
  isLabelsOpen: boolean,
  isAssigneesOpen: boolean,
  labels: {}[],
  storedLabels: Object,
  storedAssignees: Object
};

class SideBar extends Component<Props, State> {
  state = {
    isLabelsOpen: false,
    isAssigneesOpen: false,
    labels: [],
    collaborators: [],
    storedLabels: {},
    storedAssignees: {}
  };

  componentDidMount() {
    const { name, repo } = this.props.match.params;
    this.props.fetchCollaborators(name, repo);
    this.setState({ labels: labelsOptions });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.collaborators !== this.props.collaborators) {
      this.setState({ collaborators: this.props.collaborators });
    }
  }

  toggleState = property => {
    this.setState({ [property]: !this.state[property] });
  };

  handleAssigneeSelect = assignee => {
    let collaborators = [...this.state.collaborators];
    const storedAssignees = { ...this.state.storedAssignees };
    const collaboratorIndex = collaborators.findIndex(
      c => assignee.login === c.login
    );

    if (get('isAssignee', assignee)) {
      delete collaborators[collaboratorIndex].isAssignee;
      delete storedAssignees[assignee.login];
    } else {
      collaborators = collaborators.map((collaborator, index) => {
        if (index === collaboratorIndex) {
          return {
            ...collaborator,
            isAssignee: true
          };
        }

        return collaborator;
      });

      storedAssignees[assignee.login] = assignee.login;
    }
    this.setState({
      collaborators: collaborators,
      storedAssignees: storedAssignees
    });
    const items = values(storedAssignees);
    this.props.handleSetValues('assignees', items);
  };

  renderAssignees = () => {
    if (!isEmpty(this.state.storedAssignees)) {
      return map(
        assignee => (
          <AssigneeContainer key={assignee.id}>
            <AssigneeAvatar avatar={assignee.avatar_url} />
            <AssigneeName>{assignee.login}</AssigneeName>
          </AssigneeContainer>
        ),
        this.state.storedAssignees
      );
    }
    return <Info>No one assigned</Info>;
  };

  handleLabelChange = (params, label) => {
    const labels = [...this.state.labels];
    const storedLabels = { ...this.state.storedLabels };
    const labelIndex = labels.findIndex(l => label.name === l.name);

    if (get('default', label)) {
      delete labels[labelIndex].default;
      delete storedLabels[label.name];
    } else {
      labels[labelIndex].default = true;
      storedLabels[label.name] = label.name;
    }

    this.setState({
      labels: labels,
      storedLabels: storedLabels
    });
    const items = values(storedLabels);
    this.props.handleSetValues('labels', items);
  };

  renderLabels = () => {
    if (size(this.state.storedLabels)) {
      return map(
        label => (
          <LabelBar color={label.color} key={label.id}>
            <LabelText>{label.name}</LabelText>
          </LabelBar>
        ),
        this.state.storedLabels
      );
    }
    return <Info>None yet</Info>;
  };

  render() {
    return (
      <Wrapper>
        <ItemsContainer>
          <TitleIconContainer>
            <Title>Assignees</Title>
            <Icon onClick={() => this.toggleState('isAssigneesOpen')} />
            <ListSelect
              top="23px"
              right="-2px"
              isOpen={this.state.isAssigneesOpen}
              items={this.state.collaborators}
              render={collaborator => (
                <Assignee
                  handleAssigneeSelect={this.handleAssigneeSelect}
                  assignee={collaborator}
                />
              )}
            />
          </TitleIconContainer>
          {this.renderAssignees()}
        </ItemsContainer>
        <ItemsContainer>
          <TitleIconContainer>
            <Title>Labels</Title>
            <Icon onClick={() => this.toggleState('isLabelsOpen')} />
            <ListSelect
              top="23px"
              right="-2px"
              isOpen={this.state.isLabelsOpen}
              items={this.state.labels}
              render={label => (
                <Label
                  handleLabelClick={this.handleLabelChange}
                  key={uuid()}
                  label={label}
                />
              )}>
              Apply labels to this issue
            </ListSelect>
          </TitleIconContainer>
          {this.renderLabels()}
        </ItemsContainer>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 230px;
`;

const ItemsContainer = styled.div`
  position: relative;
  border-bottom: 1px solid #e6ebf1;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const TitleIconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  color: #586069;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  margin-bottom: 10px;
  margin: 0;
`;

const Icon = styled.div`
  background: url(${gear}) no-repeat center;
  background-size: contain;
  width: 20px;
  height: 20px;
  cursor: pointer;
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

const mapStateToProps = state => ({
  collaborators: state.issues.collaborators
});

export default withRouter(
  connect(mapStateToProps, { fetchCollaborators })(SideBar)
);
