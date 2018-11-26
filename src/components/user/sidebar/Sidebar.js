import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Repositories from 'components/user/sidebar/Repositories';
import { fetchUserRepositories } from 'actions/user.actions';

import type { State } from 'types/redux.types';

type ConnectedProps = {
  fetchUserRepositories: () => void,
  userInfo: Object | null,
  repositories: Object[]
};

type OwnProps = {};

class Sidebar extends Component<ConnectedProps, OwnProps> {
  componentDidUpdate(prevProps) {
    if (this.props.userInfo && prevProps.userInfo !== this.props.userInfo) {
      this.props.fetchUserRepositories(this.props.userInfo.repos_url);
    }
  }

  render() {
    return (
      <Wrapper>
        <Repositories repositories={this.props.repositories} />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 333px;
  border: 1px solid #e1e4e8;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const mapStateToProps = (state: State) => ({
  userInfo: state.user.userInfo,
  repositories: state.user.userRepositories
});

export default connect(mapStateToProps, { fetchUserRepositories })(Sidebar);
