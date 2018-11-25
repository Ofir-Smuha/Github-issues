// @flow
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import history from 'utils/history.utils';

import store from 'store';
import theme from 'constants/themes.constants';

import Login from 'components/login/Login';
import IssuesPage from 'components/issues/IssuesPage';
import IssueDetails from 'components/issues/details/IssueDetails';
import HomePage from 'components/user/HomePage';
import ErrorBoundary from './ErrorBoundary';

type Props = {};

class App extends React.Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ErrorBoundary>
            <Router history={history}>
              <Switch>
                <Route exact path="/issues" component={IssuesPage} />
                <Route exact path="/issues/:issueId" component={IssueDetails} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/user" component={HomePage} />
                <Redirect exact from="/" to="/login" />
              </Switch>
            </Router>
          </ErrorBoundary>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
