import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { hasIn } from 'lodash/fp';

import check from 'assets/images/check.svg';

import type { AssigneeType } from 'components/issues/issues.types';

type Props = {
  assignee: AssigneeType,
  match: Object,
  handleAssigneeSelect: () => void
};

const Assignee = (props: Props) => {
  const handleAssigneeSelect = () => {
    props.handleAssigneeSelect(props.assignee);
  };
  const { login } = props.assignee;
  const isAssignee = hasIn('isAssignee', props.assignee);

  return (
    <AssigneeContainer onClick={handleAssigneeSelect}>
      <Active active={isAssignee} />
      <NameAvatarContainer>
        <Avatar
          avatar={
            hasIn(props.assignee)
              ? props.assignee.avatar_url
              : props.assignee.user.avatar_url
          }
        />
        <Name>{login}</Name>
      </NameAvatarContainer>
    </AssigneeContainer>
  );
};

Assignee.propTypes = {
  handleAssigneeSelect: PropTypes.func
};

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

export default Assignee;
