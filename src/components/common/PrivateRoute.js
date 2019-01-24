import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  // TODO : when API limit finishes, check functionality
  if (!isAuthenticated) {
    return <Redirect to={{ pathname: '/login' }} />;
  }

  return <Route {...rest} render={props => <Component {...props} />} />;

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login'
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
