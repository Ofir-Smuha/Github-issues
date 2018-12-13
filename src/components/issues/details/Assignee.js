import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { hasIn } from 'lodash/fp';

import { addAssignee, deleteAssignee } from 'actions/issues.actions';

import check from 'assets/images/check.svg';

import type { AssigneeType } from 'components/issues/issues.types';

type OwnProps = {
  assignee: AssigneeType,
  match: Object
};

type ConnectedProps = {
  deleteAssignee: () => void,
  addAssignee: () => void
};

class Assignee extends Component<OwnProps, ConnectedProps> {
  handleAssigneeSelect = assignee => {
    const { repo, name, number } = this.props.match.params;
    const query = {
      repo,
      name,
      number,
      assignees: {
        assignees: [this.props.assignee.login]
      }
    };

    if (hasIn('isAssignee', assignee)) {
      this.props.deleteAssignee(query);
    } else {
      this.props.addAssignee(query);
    }
  };

  render() {
    console.log('assignee', this.props.assignee);
    const { login } = this.props.assignee;
    const isAssignee = hasIn('isAssignee', this.props.assignee);

    return (
      <AssigneeContainer
        onClick={() => this.handleAssigneeSelect(this.props.assignee)}>
        <Active active={isAssignee} />
        <NameAvatarContainer>
          <Avatar
            avatar={
              hasIn(this.props.assignee)
                ? this.props.assignee.avatar_url
                : this.props.assignee.user.avatar_url
            }
          />
          <Name>{login}</Name>
        </NameAvatarContainer>
      </AssigneeContainer>
    );
  }
}

const AssigneeContainer = styled.div`
  position: relative;
  padding: 8px 8px 8px 30px;
  color: #24292e;
  background-color: #fff;
  z-index: 2;
  cursor: pointer;

  &:hover {
    background-color: #1f68da;
    color: #fff;
  }
`;

const Active = styled.div`
  background: url(${check}) no-repeat center;
  width: 13px;
  height: 13px;
  position: absolute;
  top: 10px;
  left: 8px;
  display: none;

  ${({ active }) =>
    active &&
    `
    display: block;
  `};
`;

const NameAvatarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  background: url(${({ avatar }) => avatar}) no-repeat center;
  width: 15px;
  height: 15px;
  background-size: contain;
  margin-right: 10px;
`;

const Name = styled.h1`
  font-size: 14px;
  font-weight: 600;
`;

export default withRouter(
  connect(null, { addAssignee, deleteAssignee })(Assignee)
);
