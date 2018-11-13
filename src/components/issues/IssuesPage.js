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

const ListSortWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

type StateWithIssues = State;

type ConnectedProps = {
  fetchIssues: () => void,
  openIssues: Issues
};

type OwnProps = {};

class IssuesPage extends Component<ConnectedProps & OwnProps> {
  state = {
    issuesState: false
  };

  componentDidMount() {
    this.props.fetchIssues();
  }

  handleFetchByState = issuesState => {
    this.props.fetchIssues(null, { state: issuesState });
    this.setState({
      issuesState: issuesState
    });
  };

  handlePageChange = page => {
    if (this.state.issuesState) {
      this.props.fetchIssues(page, { state: this.state.issuesState });
    } else {
      this.props.fetchIssues(page);
    }
  };

  render() {
    return (
      <div>
        <ListSortWrapper>
          <SortIssues handleFetchByState={this.handleFetchByState} />
          <IssuesList openIssues={this.props.openIssues} />
        </ListSortWrapper>
        <Paginate handlePageChange={this.handlePageChange} />
      </div>
    );
  }
}

const mapStateToProps = (state: StateWithIssues) => ({
  openIssues: state.issues.openIssues
});

export default connect(mapStateToProps, { fetchIssues })(IssuesPage);
