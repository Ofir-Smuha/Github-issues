import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { get } from 'lodash/fp';
import qs from 'qs';

import type { State } from 'types/redux.types';

import Sidebar from 'components/user/sidebar/Sidebar';
import { getUserTokenWithCode, resetAuthError } from 'actions/user.actions';
import GlobalLayout from '../common/GlobalLayout';

type ConnectedProps = {
  isAuthenticated: boolean | null,
  resetAuthError: () => void,
  badCode: boolean,
  history: Object
};

type OwnProps = {};

class HomePage extends Component<ConnectedProps & OwnProps> {
  render() {
    return (
      <GlobalLayout>
        <Content>
          <Sidebar />
        </Content>
      </GlobalLayout>
    );
  }
}

const Content = styled.div`
  max-width: 1012px;
  margin: 0 auto;
`;

const mapStateToProps = (state: State) => ({
  isAuthenticated: state.user.token,
  badCode: state.user.badCode
});

export default withRouter(
  connect(mapStateToProps, { resetAuthError })(HomePage)
);
