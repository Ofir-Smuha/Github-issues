// @flow
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import history from 'utils/history.utils';

import store from 'store';
import theme from 'constants/themes.constants';

import IssuesPage from 'components/issues/IssuesPage';
import IssueDetails from 'components/issues/IssueDetails';

class App extends React.Component<{||}> {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <Switch>
              <Route exact path="/issues" component={IssuesPage} />
              <Route exact path="/issues/:issueId" component={IssueDetails} />
              <Redirect from="/" to="/issues" />
            </Switch>
          </Router>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
