import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash/fp';
import qs from 'qs';

import type { State } from 'types/redux.types';
import type { UserState } from 'reducers/user.reducer';

import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import { getUserTokenWithCode } from 'actions/user.actions';

type StateWithUser = State & {
  user: UserState
};

type connectedProps = {
  isAuthenticated: any,
  getUserTokenWithCode: () => void
};

type OwnProps = {};

class HomePage extends Component<connectedProps & OwnProps> {
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

  render() {
    return (
      <div>
        <Header />
        HOME PAGE
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state: StateWithUser) => ({
  isAuthenticated: state.user.token
});
export default withRouter(
  connect(mapStateToProps, { getUserTokenWithCode })(HomePage)
);
