// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { setCurrentIssue } from 'actions/issues.actions';

type OwnProps = {};

type ConnectedProps = {};

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

const mapStateToProps = ({ issues }) => ({
  currentIssue: issues.currentIssue
});

export default connect(mapStateToProps, { setCurrentIssue })(IssueDetails);
