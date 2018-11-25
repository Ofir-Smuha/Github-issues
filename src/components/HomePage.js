import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash/fp';
import qs from 'qs';

import type { State } from 'types/redux.types';

import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import { getUserTokenWithCode, resetAuthError } from 'actions/user.actions';

type ConnectedProps = {
  userInfo: Object,
  isAuthenticated: boolean | null,
  getUserTokenWithCode: () => void,
  resetAuthError: () => void,
  badCode: boolean,
  history: Object
};

type OwnProps = {};

class HomePage extends Component<ConnectedProps & OwnProps> {
  componentDidMount() {
    if (!this.props.isAuthenticated) {
      if (get('location.search', window)) {
        const codeParams = qs.parse(window.location.search);
        const userCode = codeParams['?code'];
        this.props.getUserTokenWithCode(userCode);
      } else {
        this.props.history.push('/login');
      }
    }
  }

  componentDidUpdate() {
    if (this.props.badCode === true) {
      this.props.history.push('/login');
      this.props.resetAuthError();
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
  userInfo: state.user.userInfo,
  badCode: state.user.badCode
});

export default withRouter(
  connect(mapStateToProps, { getUserTokenWithCode, resetAuthError })(HomePage)
);
