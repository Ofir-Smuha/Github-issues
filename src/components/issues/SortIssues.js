// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import SortDropDown from 'components/issues/filter-sort-panel/SortDropDown';
import IssuesState from 'components/issues/filter-sort-panel/IssuesState';
import ListSelect from 'components/common/ListSelect';

import { setSortStateInState, setSortingInState } from 'actions/issues.actions';

import downArrow from 'assets/images/drop-down.svg';

type ConnectedProps = {
  setSortStateInState: () => void,
  setSortingInState: () => void
};

type OwnProps = {};

type State = {
  isOpen: boolean
};

class SortIssues extends Component<ConnectedProps & OwnProps, State> {
  state = {
    isOpen: false,
    isSortOpen: false,
    isAssigneeOpen: false
  };

  setFetchByState = issuesState => {
    this.props.setSortStateInState(issuesState);
  };

  setFetchBySort = sorting => {
    this.props.setSortingInState(sorting);
    this.setState({
      isOpen: false
    });
  };

  toggleSort = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleClickOutSide = () => {
    this.setState({
      isOpen: false
    });
  };

  render() {
    return (
      <SortContainer>
        <IssuesState handleSetFetchByState={this.setFetchByState} />
        <ItemSelectContainer>
          <ItemSelect>
            <BarText>Assignee</BarText>
            <SortIcon onClick={this.toggleSort} />
            {this.state.isOpen && (
              <SortDropDown
                handleClickOutSide={this.handleClickOutSide}
                setFetchBySort={this.setFetchBySort}
              />
            )}
          </ItemSelect>
          <ItemSelect onClick={this.toggleSort}>
            <BarText>Sort</BarText>
            <SortIcon />
            <ListSelect
              searchable={true}
              right="25px"
              top="25px"
              isOpen={this.state.isAssigneeOpen}
            />
          </ItemSelect>
        </ItemSelectContainer>
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

const BarText = styled.h3`
  color: #586069;
  font-size: 14px;
  font-weight: 400;
`;

const ItemSelectContainer = styled.div`
  display: flex;
`;

const ItemSelect = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 10px;
  }
  &:last-child {
    margin-right: 5px;
  }
`;

const SortIcon = styled.div`
  background: url(${downArrow}) no-repeat center;
  width: 13px;
  height: 13px;
  margin: 5px 5px 0 3px;
`;

export default connect(null, { setSortStateInState, setSortingInState })(
  SortIssues
);
