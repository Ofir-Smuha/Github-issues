import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash/fp';
import qs from 'qs';

import type { State } from 'types/redux.types';

import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import { getUserTokenWithCode } from 'actions/user.actions';

type ConnectedProps = {
  isAuthenticated: boolean | null,
  getUserTokenWithCode: () => void,
  userInfo: Object
};

type OwnProps = {};

class HomePage extends Component<ConnectedProps & OwnProps> {
  componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
    if (get('location.search', window)) {
      const codeParams = qs.parse(window.location.search);
      const userCode = codeParams['?code'];
      this.props.getUserTokenWithCode(userCode);
    } else {
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <div>
        <Header userInfo={this.props.userInfo} />
        HOME PAGE
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  isAuthenticated: state.user.token,
  userInfo: state.user.userInfo
});
export default withRouter(
  connect(mapStateToProps, { getUserTokenWithCode })(HomePage)
);
