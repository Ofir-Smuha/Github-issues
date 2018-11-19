// @flow
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import history from 'utils/history.utils';

import store from 'store';
import theme from 'constants/themes.constants';

import IssuesPage from 'components/issues/IssuesPage';
import IssueDetails from 'components/issues/details/IssueDetails';
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
                <Redirect exact from="/" to="/issues" />
              </Switch>
            </Router>
          </ErrorBoundary>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
