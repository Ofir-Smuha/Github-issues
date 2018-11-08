// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Header from './Header';
import IssueContent from './IssueContent';
import { setCurrentIssue, fetchComments } from 'actions/issues.actions';

import type { State } from 'types/redux.types';
import type { Issue, Comments } from '../issues.types';

type OwnProps = {};

type ConnectedProps = {
  setCurrentIssue: () => void,
  fetchComments: () => void,
  currentIssue: Issue,
  issueComments: Comments,
  match: Object,
  params: Object
};

class IssueDetails extends Component<ConnectedProps & OwnProps> {
  componentDidMount() {
    this.props.setCurrentIssue(this.props.match.params.issueId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.currentIssue.comments &&
      this.props.currentIssue.comments !== prevProps.currentIssue.comments
    ) {
      this.props.fetchComments(this.props.currentIssue.comments_url);
    }
  }

  render() {
    if (!this.props.currentIssue) {
      return null;
    }
    return (
      <Wrapper>
        <Header currentIssue={this.props.currentIssue} />
        <IssueContent
          currentIssue={this.props.currentIssue}
          issueComments={this.props.IssueComments}
        />
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
  currentIssue: state.issues.currentIssue,
  IssueComments: state.issues.IssueComments
});

export default connect(mapStateToProps, { setCurrentIssue, fetchComments })(
  IssueDetails
);
