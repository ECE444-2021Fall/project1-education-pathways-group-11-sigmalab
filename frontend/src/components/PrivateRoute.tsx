import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ROUTES from './../config/routes';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function isAuthenticated() {
  const username = cookies.get('username');
  const password = cookies.get('password');

  if (username && password) return true;
  else return false;
}

interface RouterProps {
  children: any;
  path: string;
}

function PrivateRoute({ children, ...rest }: RouterProps) {
  return (
    <Route
      {...rest}
      render={() => {
        return isAuthenticated() === true ? (
          children
        ) : (
          <Redirect to={ROUTES.login} />
        );
      }}
    />
  );
}

export default PrivateRoute;
