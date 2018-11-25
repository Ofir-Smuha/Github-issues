import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';

import { getUserTokenWithCode } from 'actions/user.actions';

class HomePage extends Component {
  componentDidMount() {
    const codeParams = qs.parse(window.location.search);
    const userCode = codeParams['?code'];
    this.props.getUserTokenWithCode(userCode);
  }
  render() {
    return <div>H1</div>;
  }
}

export default connect(null, { getUserTokenWithCode })(HomePage);
