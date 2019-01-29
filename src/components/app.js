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
import ErrorBoundary from './ErrorBoundary';
import Loader from 'components/common/Loader';

import {
  getUserInfoWithToken,
  saveTokenToLocalStorage,
  getUserTokenWithCode
} from 'actions/user.actions';

const HomePage = React.lazy(() => import('components/user/HomePage'));
const Login = React.lazy(() => import('components/login/Login'));
const IssuesPage = React.lazy(() => import('components/issues/IssuesPage'));
const IssueDetails = React.lazy(() =>
  import('components/issues/details/IssueDetails')
);
const NewIssue = React.lazy(() =>
  import('components/issues/new-issue/NewIssue')
);
const ErrorPage = React.lazy(() => import('components/error/ErrorPage'));

type ConnectedProps = {
  getUserInfoWithToken: () => void,
  saveTokenToLocalStorage: () => void,
  isAuthenticated: string | null
};

type OwnProps = {};

class App extends React.Component<ConnectedProps & OwnProps> {
  componentDidMount() {
    const token = get('user.token', loadFromStorage('auth'));

    if (token) {
      this.props.saveTokenToLocalStorage(token);
      this.props.getUserInfoWithToken(token);
    } else {
      const searchParams = get('search', this.props.location);

      if (searchParams) {
        const codeParams = qs.parse(searchParams);
        const userCode = codeParams['?code'];
        this.props.getUserTokenWithCode(userCode);
      } else {
        this.props.saveTokenToLocalStorage(null);
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
          <React.Suspense fallback={<Loader />}>
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
          </React.Suspense>
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
