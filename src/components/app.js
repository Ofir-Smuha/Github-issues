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
import HomePage from 'components/HomePage';
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
                <Route exact path="/" component={HomePage} />
                <Route path="/issues" component={IssuesPage} />
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
      </Provider>
    );
  }
}

export default App;
