import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { ResetIssuesSort } from 'actions/issues.actions';

type connectedProps = {
  ResetIssuesSort: () => void
};

type OwnProps = {
  sorting: any,
  issuesState: any
};

class IssuesReset extends Component<connectedProps & OwnProps> {
  render() {
    if (!this.props.sorting && !this.props.issuesState) {
      return null;
    }

    return (
      <Reset onClick={() => this.props.ResetIssuesSort()}>
        Clear current search query and sorts
      </Reset>
    );
  }
}

const Reset = styled.h1`
  font-weight: 600;
  font-size: 14px;
  line-height: 1.5;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    color: #0366d6;
  }
`;

export default connect(null, { ResetIssuesSort })(IssuesReset);
