import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import GlobalLayout from 'components/common/GlobalLayout';
import TextSubmitter from 'components/common/TextSubmitter';
import SideBar from 'components/issues/new-issue/SideBar';
import { addNewIssue } from 'actions/issues.actions';

import type { State } from 'types/redux.types';

type OwnProps = {};

type ConnectedProps = {
  addNewIssue: () => void
};

type OwnState = {
  assignees: string[],
  labels: string[]
};

class NewIssue extends Component<OwnProps, ConnectedProps, OwnState> {
  state = {
    assignees: [],
    labels: []
  };

  setValues = (key, items) => {
    this.setState({
      [key]: items
    });
  };

  handleSubmit = content => {
    const query = this.props.match.params;
    const body = {
      title: content.title,
      body: content.comment,
      assignees: this.state.assignees,
      labels: this.state.labels
    };
    this.props.addNewIssue(query, body);
  };

  render() {
    const { name, repo } = this.props.match.params;
    return (
      <GlobalLayout userInfo={this.props.userInfo}>
        <Wrapper>
          <TextSubmitter
            includeTitle="true"
            height="200px"
            submitText="Submit new issue"
            handleSubmit={this.handleSubmit}
            redirect={`/${name}/${repo}/issues`}
          />
          <SideBar handleSetValues={this.setValues} />
        </Wrapper>
      </GlobalLayout>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const mapStateToProps = (state: State) => ({
  userInfo: state.user.userInfo
});
export default withRouter(connect(mapStateToProps, { addNewIssue })(NewIssue));
