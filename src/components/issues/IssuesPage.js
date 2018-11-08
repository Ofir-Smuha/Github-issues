// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import IssuesList from './IssuesList';
import SortIssues from './SortIssues';
import { fetchIssues } from 'actions/issues.actions';

import type { State } from 'types/redux.types';
import type { Issues } from './issues.types';
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
  componentDidMount() {
    this.props.fetchIssues();
  }

  render() {
    return (
      <div>
        <ListSortWrapper>
          <SortIssues />
          <IssuesList openIssues={this.props.openIssues} />
        </ListSortWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state: StateWithIssues) => ({
  openIssues: state.issues.openIssues
});

export default connect(mapStateToProps, { fetchIssues })(IssuesPage);
