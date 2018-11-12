// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Header from 'components/issues/details/Header';
import IssueContent from 'components/issues/details/IssueContent';
import CommentsPanel from 'components/issues/details/CommentsPanel';
import { setCurrentIssue } from 'actions/issues.actions';

import type { State } from 'types/redux.types';
import type { Issue } from '../issues.types';

type OwnProps = {};

type ConnectedProps = {
  setCurrentIssue: () => void,
  currentIssue: Issue,
  match: Object,
  params: Object
};

class IssueDetails extends Component<ConnectedProps & OwnProps> {
  componentDidMount() {
    this.props.setCurrentIssue(this.props.match.params.issueId);
  }

  render() {
    if (!this.props.currentIssue) {
      return null;
    }
    return (
      <Wrapper>
        <Header currentIssue={this.props.currentIssue} />
        <IssueContent currentIssue={this.props.currentIssue} />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 80%;
  max-width: 1000px;
  margin: 0 auto;
`;

const mapStateToProps = (state: State) => ({
  currentIssue: state.issues.currentIssue
});

export default connect(mapStateToProps, { setCurrentIssue })(IssueDetails);
