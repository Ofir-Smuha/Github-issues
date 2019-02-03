import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { ResetIssuesSort } from 'actions/issues.actions';

type connectedProps = {
  ResetIssuesSort: () => void
};

type OwnProps = {
  issuesParameters: string | null,
  issuesState: string | null
};

class IssuesReset extends Component<connectedProps & OwnProps> {
  handleResetIssuesSort = () => {
    const pathname = this.props.location.pathname;
    this.props.history.push(`${pathname}`);
    this.props.ResetIssuesSort();
  };

  render() {
    if (!this.props.issuesParameters && !this.props.issuesState) {
      return null;
    }

    return (
      <div>
        <Reset onClick={this.handleResetIssuesSort}>
          Clear current search query and sorts
        </Reset>
      </div>
    );
  }
}

const Reset = styled.h1`
  display: inline-block;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.5;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    color: #0366d6;
  }
`;

export default withRouter(connect(null, { ResetIssuesSort })(IssuesReset));
