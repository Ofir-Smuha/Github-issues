// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { get, isNull } from 'lodash/fp';
import qs from 'qs';

import { loadFromStorage } from 'utils/local-storage.utils';
import theme from 'constants/themes.constants';

import PrivateRoute from 'components/common/PrivateRoute';
import Login from 'components/login/Login';
import IssuesPage from 'components/issues/IssuesPage';
import IssueDetails from 'components/issues/details/IssueDetails';
import HomePage from 'components/user/HomePage';
import ErrorBoundary from './ErrorBoundary';
import ErrorPage from 'components/error/ErrorPage';
import NewIssue from 'components/issues/new-issue/NewIssue';

import {
  getUserInfoWithToken,
  saveTokenToLocalStorage,
  getUserTokenWithCode
} from 'actions/user.actions';

type ConnectedProps = {
  getUserInfoWithToken: () => void,
  saveTokenToLocalStorage: () => void,
  isAuthenticated: string | null
};

type OwnProps = {};

class App extends React.Component<ConnectedProps & OwnProps> {
  componentWillMount() {
    const user = get('user', loadFromStorage('auth'));

    if (user && user.token !== null) {
      this.props.saveTokenToLocalStorage(user);
      this.props.getUserInfoWithToken(user);
    } else {
      const searchParams = get('search', this.props.location);

      if (searchParams) {
        const codeParams = qs.parse(searchParams);
        const userCode = codeParams['?code'];
        this.props.getUserTokenWithCode(userCode);
      } else {
        this.props.saveTokenToLocalStorage({ token: null });
      }
    }
  }

  render() {
    const { isAuthenticated } = this.props;

    if (!isNull(isAuthenticated) && !isAuthenticated) {
      return null;
    }

    return (
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <Switch>
            <PrivateRoute
              exact
              path="/"
              isAuthenticated={this.props.isAuthenticated}
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/:name/:repo/issues"
              isAuthenticated={this.props.isAuthenticated}
              component={IssuesPage}
            />
            <PrivateRoute
              path="/:name/:repo/issues/new-issue"
              isAuthenticated={this.props.isAuthenticated}
              component={NewIssue}
            />
            <PrivateRoute
              path="/:name/:repo/issues/:number"
              isAuthenticated={this.props.isAuthenticated}
              component={IssueDetails}
            />
            <Route path="/login" component={Login} />
            <Route exact path="/error" component={ErrorPage} />
          </Switch>
        </ErrorBoundary>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.token
});

export default withRouter(
  connect(mapStateToProps, {
    getUserInfoWithToken,
    saveTokenToLocalStorage,
    getUserTokenWithCode
  })(App)
);
