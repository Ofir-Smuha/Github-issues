// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { get } from 'lodash/fp';

import history from 'utils/history.utils';
import { loadFromStorage } from 'utils/local-storage.utils';

import theme from 'constants/themes.constants';
import Login from 'components/login/Login';
import IssuesPage from 'components/issues/IssuesPage';
import IssueDetails from 'components/issues/details/IssueDetails';
import HomePage from 'components/HomePage';
import ErrorBoundary from './ErrorBoundary';
import {
  getUserInfoWithToken,
  saveTokenToLocalStorage
} from 'actions/user.actions';

type ConnectedProps = {
  getUserInfoWithToken: () => void,
  saveTokenToLocalStorage: () => void
};

type OwnProps = {};

class App extends React.Component<ConnectedProps & OwnProps> {
  componentWillMount() {
    const user = get('user', loadFromStorage('auth'));
    if (user) {
      this.props.saveTokenToLocalStorage(user);
      this.props.getUserInfoWithToken(user);
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/issues" component={IssuesPage} />
              <Route path="/issues/:issueId" component={IssueDetails} />
              <Route path="/login" component={Login} />
            </Switch>
          </Router>
        </ErrorBoundary>
      </ThemeProvider>
    );
  }
}

export default connect(null, { getUserInfoWithToken, saveTokenToLocalStorage })(
  App
);
