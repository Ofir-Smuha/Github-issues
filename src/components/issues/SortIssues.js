import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import warning from 'assets/images/warning-black.svg';
import check from 'assets/images/check.svg';
import downArrow from 'assets/images/drop-down.svg';

class SortIssues extends Component {
  handleFetchByState = sorting => {
    this.props.handleFetchByState(sorting);
  };

  render() {
    return (
      <SortContainer>
        <OpenClosedContainer>
          <Open onClick={() => this.handleFetchByState('open')}>
            <OpenIcon />
            <OpenTitle>Open</OpenTitle>
          </Open>
          <Closed onClick={() => this.handleFetchByState('closed')}>
            <ClosedIcon />
            <ClosedTitle>Closed</ClosedTitle>
          </Closed>
        </OpenClosedContainer>
        <SortSelect>
          <SortText>Sort</SortText>
          <SortIcon />
        </SortSelect>
        <DropDownContainer>
          <TitleContainer>
            <Title>Sort by</Title>
          </TitleContainer>
          <OptionContainer>
            <OptionTitle>Newest</OptionTitle>
          </OptionContainer>
          <OptionContainer>
            <OptionTitle>Oldest</OptionTitle>
          </OptionContainer>
          <OptionContainer>
            <OptionTitle>Most commented</OptionTitle>
          </OptionContainer>
          <OptionContainer>
            <OptionTitle>Least comments</OptionTitle>
          </OptionContainer>
          <OptionContainer>
            <OptionTitle>Recently updated</OptionTitle>
          </OptionContainer>
        </DropDownContainer>
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
  position: relative;
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

const DropDownContainer = styled.div`
  position: absolute;
  bottom: -202px;
  right: 0;
  width: 300px;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 3px;
  box-shadow: 0 3px 12px rgba(27, 31, 35, 0.15);
`;

const TitleContainer = styled.div`
  background: #f6f8fa;
  border-bottom: 1px solid #e1e4e8;
  line-height: 16px;
  padding: 8px 10px;
`;

const Title = styled.h1`
  color: #24292e;
  font-weight: 600;
  font-size: 12px;
`;

const OptionContainer = styled.div`
  background: #fff;
  border-bottom: 1px solid #e1e4e8;
  line-height: 16px;
  padding: 8px 10px;
`;

const OptionTitle = styled(Title)`
  cursor: pointer;

  &:hover {
    color: #0366d6;
  }
`;

export default connect(null)(SortIssues);
