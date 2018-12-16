import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import TextSubmitter from 'components/common/TextSubmitter';
import SideBar from 'components/issues/new-issue/SideBar';

import { addNewIssue } from 'actions/issues.actions';

type OwnProps = {};

type ConnectedProps = {
  addNewIssue: () => void
};

type State = {
  assignees: [],
  labels: []
};

class NewIssue extends Component<OwnProps, ConnectedProps, State> {
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
    console.log('BODY', body);
    this.props.addNewIssue(query, body);
  };

  render() {
    const { name, repo } = this.props.match.params;
    return (
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
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  width: 1000px;
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
`;
export default withRouter(connect(null, { addNewIssue })(NewIssue));
