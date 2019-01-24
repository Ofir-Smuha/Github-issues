import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { get } from 'lodash/fp';

import type { State } from 'types/redux.types';

import Header from 'components/common/Header';
import Sidebar from 'components/user/sidebar/Sidebar';
import Footer from 'components/common/Footer';
import { resetAuthError } from 'actions/user.actions';

type ConnectedProps = {
  userInfo: Object,
  isAuthenticated: boolean | null,
  resetAuthError: () => void,
  badCode: boolean,
  history: Object
};

type OwnProps = {};

class HomePage extends Component<ConnectedProps & OwnProps> {
  render() {
    return (
      <div>
        <Header userInfo={this.props.userInfo} />
        <Content>
          <Sidebar />
        </Content>
        <Footer />
      </div>
    );
  }
}

const Content = styled.div`
  max-width: 1012px;
  margin: 0 auto;
`;

const mapStateToProps = (state: State) => ({
  isAuthenticated: state.user.token,
  userInfo: state.user.userInfo,
  badCode: state.user.badCode
});

export default withRouter(
  connect(mapStateToProps, { resetAuthError })(HomePage)
);
