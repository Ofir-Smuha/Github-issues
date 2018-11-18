// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import IssuesReset from 'components/issues/IssuesReset';
import IssuesList from 'components/issues/IssuesList';
import SortIssues from 'components/issues/SortIssues';
import Paginate from 'components/issues/Paginate';
import { fetchIssues } from 'actions/issues.actions';

import type { State } from 'types/redux.types';
import type { Issues } from 'components/issues/issues.types';
import type { IssuesState } from 'reducers/issues.reducer';

type StateWithIssues = State;

type ConnectedProps = {
  fetchIssues: () => void,
  openIssues: Issues,
  currentPage: number,
  issuesState: any,
  sorting: any
};

type OwnProps = {};

class IssuesPage extends Component<ConnectedProps & OwnProps> {
  componentDidMount() {
    this.handleFetchIssues();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.sorting !== this.props.sorting ||
      prevProps.issuesState !== this.props.issuesState ||
      prevProps.currentPage !== this.props.currentPage
    ) {
      this.handleFetchIssues();
    }
  }

  handleFetchIssues = () => {
    this.props.fetchIssues(this.props.currentPage, {
      state: this.props.issuesState,
      sort: this.props.sorting
    });
  };

  render() {
    return (
      <Wrapper>
        <IssuesReset
          sorting={this.props.sorting}
          issuesState={this.props.issuesState}
        />
        <SortIssues />
        <IssuesList openIssues={this.props.openIssues} />
        <Paginate />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  margin-top: 70px;
  width: 90%;
  margin: 70px auto 0;
`;

const mapStateToProps = (state: StateWithIssues) => ({
  openIssues: state.issues.openIssues,
  currentPage: state.issues.currentPage,
  issuesState: state.issues.issuesState,
  sorting: state.issues.sorting
});

export default connect(mapStateToProps, { fetchIssues })(IssuesPage);