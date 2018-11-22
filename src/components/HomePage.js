import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash/fp';
import qs from 'qs';

import type { State } from 'types/redux.types';
import type { UserState } from 'reducers/user.reducer';

import { getUserTokenWithCode, resetAuthError } from 'actions/user.actions';

type StateWithUser = State & {
  user: UserState
};

type connectedProps = {
  isAuthenticated: any,
  getUserTokenWithCode: () => void,
  resetAuthError: () => void,
  badCode: boolean,
  history: Object
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

  componentDidUpdate() {
    if (this.props.badCode === true) {
      this.props.history.push('/login');
      this.props.resetAuthError();
    }
  }

  render() {
    return <div>HOME PAGE</div>;
  }
}

const mapStateToProps = (state: StateWithUser) => ({
  isAuthenticated: state.user.token,
  badCode: state.user.badCode
});
export default withRouter(
  connect(mapStateToProps, { getUserTokenWithCode, resetAuthError })(HomePage)
);
