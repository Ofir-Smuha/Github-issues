import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { get } from 'lodash/fp';

import Loader from 'components/common/Loader';

import {
  getUserTokenWithCode,
  saveTokenToLocalStorage
} from 'actions/user.actions';

class AuthenticatePage extends Component {
  componentDidMount() {
    const searchParams = get('search', this.props.location);

    if (searchParams) {
      const codeParams = qs.parse(searchParams);
      const userCode = codeParams['?code'];
      this.props.getUserTokenWithCode(userCode);
    }

    if (!searchParams) {
      this.props.token
        ? this.props.history.push('/')
        : this.props.history.push('/login');
    }
  }

  componentDidUpdate() {
    if (this.props.badCodeRequest) {
      this.props.history.push('/login');
    }

    if (this.props.token) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <Fragment>
        <Loader isLoading={true} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  badCodeRequest: state.user.badCode,
  token: state.user.token
});

export default withRouter(
  connect(mapStateToProps, { getUserTokenWithCode, saveTokenToLocalStorage })(
    AuthenticatePage
  )
);
