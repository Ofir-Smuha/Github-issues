import React, { Component } from 'react';
import styled from 'styled-components';

import check from 'assets/images/check.svg';
import exit from 'assets/images/exit.svg';

type OwnProps = {
  assignee: Object
};

type ConnectedProps = {};

class Assignee extends Component<OwnProps, ConnectedProps> {
  componentDidMount() {
    console.log(this.props);
  }
  componentWillUpdate() {
    console.log('props: ', this.props);
  }
  render() {
    return (
      <AssigneeContainer>
        <Active />
        <Avatar />
        <Name />
      </AssigneeContainer>
    );
  }
}

const AssigneeContainer = styled.div`
  position: relative;
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

const Avatar = styled.div``;

const Name = styled.h1``;

const DeActivate = styled.div`
  position: absolute;
  background: url(${exit}) no-repeat center;
  width: 10px;
  height: 10px;
  right: 10px;
  top: 12px;
  display: none;
  ${({ active }) =>
    active &&
    `
    display: block;
  `};
`;

export default Assignee;
