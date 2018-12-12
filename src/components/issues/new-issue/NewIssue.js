import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import TextSubmitter from 'components/common/TextSubmitter';

import { addNewIssue } from 'actions/issues.actions';

class NewIssue extends Component {
  handleAction = content => {
    const query = this.props.match.params;
    this.props.addNewIssue(query, content);
  };

  render() {
    const { name, repo } = this.props.match.params;
    return (
      <div>
        <TextSubmitter
          includeTitle="true"
          height="200px"
          submitText="Submit new issue"
          handleSubmit={this.handleAction}
          redirect={`/${name}/${repo}/issues`}
        />
      </div>
    );
  }
}

export default withRouter(connect(null, { addNewIssue })(NewIssue));
