// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Header from 'components/issues/details/Header';
import IssueContent from 'components/issues/details/IssueContent';
import SideBar from 'components/issues/details/SideBar';
import Loader from 'components/common/Loader';
import { isLoadingSelector } from 'selectors/network.selectors';
import {
  fetchIssue,
  removeCurrentIssue,
  fetchComments,
  removeComments,
  ISSUE_LABEL
} from 'actions/issues.actions';

import type { State } from 'types/redux.types';
import type { Issue, Comments } from '../issues.types';

type OwnProps = {};

type ConnectedProps = {
  fetchIssue: () => void,
  removeCurrentIssue: () => void,
  fetchComments: () => void,
  removeComments: () => void,
  currentIssue?: Issue,
  issueComments: Comments,
  match: Object,
  params: Object,
  isAuthenticated: any
};

class IssueDetails extends Component<ConnectedProps & OwnProps> {
  componentDidMount() {
    if (!this.props.isAuthenticated) {
      this.props.history.push('/login');
    }
    const { name, repo, number } = this.props.match.params;
    this.props.fetchIssue({ name, repo, number });
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.currentIssue &&
      this.props.currentIssue.comments &&
      this.props.currentIssue !== prevProps.currentIssue
    ) {
      this.props.fetchComments(this.props.currentIssue.comments_url);
    }
  }

  componentWillUnmount() {
    this.props.removeCurrentIssue();
    if (this.props.currentIssue && this.props.currentIssue.comments) {
      this.props.removeComments();
    }
  }

  render() {
    if (!this.props.currentIssue) {
      return <Loader isLoading={this.props.isLoading} />;
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
  issueComments: state.issues.issueComments,
  isAuthenticated: state.user.token,
  isLoading: isLoadingSelector(state, ISSUE_LABEL)
});

export default connect(mapStateToProps, {
  fetchIssue,
  removeCurrentIssue,
  fetchComments,
  removeComments
})(IssueDetails);
