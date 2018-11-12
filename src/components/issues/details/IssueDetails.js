// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Header from 'components/issues/details/Header';
import IssueContent from 'components/issues/details/IssueContent';
import SideBar from './SideBar';
import {
  setCurrentIssue,
  fetchComments,
  removeComments
} from 'actions/issues.actions';

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

  componentDidUpdate(prevProps) {
    if (
      this.props.currentIssue.comments &&
      this.props.currentIssue !== prevProps.currentIssue
    ) {
      this.props.fetchComments(this.props.currentIssue.comments_url);
    }
    console.log('props', this.props);
  }

  componentWillUnmount() {
    if (this.props.currentIssue.comments) {
      this.props.removeComments();
    }
  }
  render() {
    if (!this.props.currentIssue) {
      return null;
    }
    return (
      <Wrapper>
        <Header currentIssue={this.props.currentIssue} />
        <ContentContainer>
          <IssueContent
            currentIssue={this.props.currentIssue}
            issueComments={this.props.issueComments}
          />
          <SideBar currentIssue={this.props.currentIssue} />
        </ContentContainer>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 80%;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const mapStateToProps = (state: State) => ({
  currentIssue: state.issues.currentIssue,
  issueComments: state.issues.issueComments
});

export default connect(mapStateToProps, {
  setCurrentIssue,
  fetchComments,
  removeComments
})(IssueDetails);
