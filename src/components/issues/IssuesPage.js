// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

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
  state = {
    issuesState: false,
    sorting: false
  };

  componentDidMount() {
    this.props.fetchIssues();
  }

  componentDidUpdate(prevProps) {
    console.log('prevprops', prevProps);
    console.log(prevProps.issuesState !== this.props.issuesState);
    if (
      prevProps.sorting !== this.props.sorting ||
      prevProps.issuesState !== this.props.issuesState ||
      prevProps.currentPage !== this.props.currentPage
    ) {
      this.props.fetchIssues(this.props.currentPage, {
        state: this.props.issuesState,
        sort: this.props.sorting
      });
    }
  }

  render() {
    return (
      <div>
        <ListSortWrapper>
          <SortIssues />
          <IssuesList openIssues={this.props.openIssues} />
        </ListSortWrapper>
        <Paginate />
      </div>
    );
  }
}

const ListSortWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const mapStateToProps = (state: StateWithIssues) => ({
  openIssues: state.issues.openIssues,
  currentPage: state.issues.currentPage,
  issuesState: state.issues.issuesState,
  sorting: state.issues.sorting
});

export default connect(mapStateToProps, { fetchIssues })(IssuesPage);
