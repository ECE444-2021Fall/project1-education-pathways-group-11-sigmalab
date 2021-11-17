import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import ROUTES from './../config/routes';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function isAuthenticated() {
  const username = cookies.get('username');
  const password = cookies.get('password');

  if (username && password) return true;
  else return false;
}

function PrivateRoute({ children, ...rest }: RouteProps) {
  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated() === true ? (
          <>{children}</>
        ) : (
          <Redirect to={ROUTES.login} />
        )
      }
    />
  );
}

export default PrivateRoute;
