// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import GlobalLayout from 'components/common/GlobalLayout';
import FillterAddBar from 'components/issues/FilterAddBar';
import IssuesReset from 'components/issues/IssuesReset';
import IssuesList from 'components/issues/IssuesList';
import SortIssues from 'components/issues/SortIssues';
import Paginate from 'components/issues/Paginate';
import Loader from 'components/common/Loader';

import {
  fetchIssues,
  fetchCollaborators,
  ISSUES_LABEL
} from 'actions/issues.actions';
import { isLoadingSelector } from 'selectors/network.selectors';

import type { State } from 'types/redux.types';
import type { Issues } from 'components/issues/issues.types';

type ConnectedProps = {
  fetchIssues: () => void,
  openIssues: Issues,
  currentPage: number,
  issuesState: any,
  sorting: any,
  isLoading: boolean,
  isAuthenticated: string,
  history: Object,
  error: boolean,
  userInfo: Object | null
};

type OwnProps = {};

class IssuesPage extends Component<ConnectedProps & OwnProps> {
  componentDidMount() {
    const { name, repo } = this.props.match.params;
    if (!this.props.isAuthenticated) {
      this.props.history.push('/login');
    }
    this.handleFetchIssues();
    this.props.fetchCollaborators(name, repo);
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
    const { name, repo } = this.props.match.params;

    this.props.fetchIssues(
      this.props.currentPage,
      {
        state: this.props.issuesState,
        sort: this.props.sorting
      },
      { name, repo }
    );
  };

  render() {
    return (
      <GlobalLayout userInfo={this.props.userInfo}>
        <Wrapper>
          <Loader isLoading={this.props.isLoading} />
          <FillterAddBar />
          <IssuesReset
            sorting={this.props.sorting}
            issuesState={this.props.issuesState}
          />
          <SortIssues />
          <IssuesList openIssues={this.props.openIssues} />
          <Paginate />
        </Wrapper>
      </GlobalLayout>
    );
  }
}

const Wrapper = styled.div`
  max-width: 1012px;
  margin: 0 auto;
`;

const mapStateToProps = (state: State) => ({
  openIssues: state.issues.openIssues,
  currentPage: state.issues.currentPage,
  issuesState: state.issues.issuesState,
  sorting: state.issues.sorting,
  isLoading: isLoadingSelector(state, ISSUES_LABEL),
  isAuthenticated: state.user.token,
  userInfo: state.user.userInfo
});

export default withRouter(
  connect(mapStateToProps, { fetchIssues, fetchCollaborators })(IssuesPage)
);
