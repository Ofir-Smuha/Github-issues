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
  getUserDataWithToken,
  saveTokenToLocalStorage
} from 'actions/user.actions';

type connectedProps = {
  getUserDataWithToken: () => void,
  saveTokenToLocalStorage: () => void
};

type OwnProps = {};

class App extends React.Component<connectedProps & OwnProps> {
  componentWillMount() {
    const user = get('user', loadFromStorage('auth'));
    if (user) {
      this.props.saveTokenToLocalStorage(user);
      this.props.getUserDataWithToken(user);
    }
  }

  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <ErrorBoundary>
            <Router history={history}>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/issues" component={IssuesPage} />
                <Route path="/issues/:issueId" component={IssueDetails} />
                <Route path="/login" component={Login} />
                // TODO: add files to new routes
                {/*<Route path="/user" />*/}
                {/*<Route path="/user/repositories" />*/}
                {/*<Route path="/user/repositories/:repo" />*/}
                {/*<Route exact path="/:org" />*/}
                {/*<Route path="/:org/:repo" />*/}
                {/*<Route path="/:org/:repo/issues" />*/}
                {/*<Route path="/:org/:repo/issues/:issueId" />*/}
              </Switch>
            </Router>
          </ErrorBoundary>
        </ThemeProvider>
      </div>
    );
  }
}

export default connect(null, { getUserDataWithToken, saveTokenToLocalStorage })(
  App
);
