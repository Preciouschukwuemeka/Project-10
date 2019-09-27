import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

//higher-order component for configuring protected routes (routes that require authentication)

export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => (
        //defines the function that renders the component associated with the private route if theres an authenticated user
        <Route
          {...rest}
          render={props => context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect to={{
                pathname: '/signin',
                state: { from: props.location },
              }} />
            )
          }
        />
      )}
    </Consumer>
  );
};
