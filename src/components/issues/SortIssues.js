import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import warning from 'assets/images/warning-black.svg';
import check from 'assets/images/check.svg';
import downArrow from 'assets/images/drop-down.svg';

class SortIssues extends Component {
  handleRequestOpen() {}

  handleRequestClosed() {}

  render() {
    return (
      <SortContainer>
        <OpenClosedContainer>
          <Open onClick={this.handleRequestOpen}>
            <OpenIcon />
            <OpenTitle>Open</OpenTitle>
          </Open>
          <Closed onClick={this.handleRequestClosed}>
            <ClosedIcon />
            <ClosedTitle>Closed</ClosedTitle>
          </Closed>
        </OpenClosedContainer>
        <SortSelect>
          <SortText>Sort</SortText>
          <SortIcon />
        </SortSelect>
      </SortContainer>
    );
  }
}

const SortContainer = styled.div`
  background-color: #f7f8fb;
  height: 50px;
  border: 1px solid #d1d5da;
  border-radius-top-right: 3px;
  border-radius-top-left: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OpenClosedContainer = styled.div`
  display: flex;
`;

const Open = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
  cursor: pointer;
`;

const OpenTitle = styled.h3`
  color: #586069;
  font-size: 14px;
  font-weight: 400;
`;

const OpenIcon = styled.div`
  background: url(${warning}) no-repeat center;
  width: 20px;
  height: 20px;
  margin-top: 2px;
  margin-right: 5px;
`;

const Closed = styled(Open)`
  margin-left: 10px;
`;

const ClosedTitle = styled(OpenTitle)``;

const ClosedIcon = styled(OpenIcon)`
  background: url(${check}) no-repeat center;
  width: 18px;
  height: 20px;
`;

const SortSelect = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SortText = styled(OpenTitle)``;

const SortIcon = styled(OpenIcon)`
  background: url(${downArrow}) no-repeat center;
  width: 13px;
  height: 13px;
  margin: 5px 5px 0 3px;
`;

export default connect(null)(SortIssues);
