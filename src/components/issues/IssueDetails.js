// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { setCurrentIssue } from 'actions/issues.actions';

import type { State } from 'types/redux.types';
import type { Issue } from './issues.types';

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

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.currentIssue);
  }

  render() {
    return (
      <div>
        <h1>{this.props.currentIssue.body}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  currentIssue: state.issues.currentIssue
});

export default connect(mapStateToProps, { setCurrentIssue })(IssueDetails);
