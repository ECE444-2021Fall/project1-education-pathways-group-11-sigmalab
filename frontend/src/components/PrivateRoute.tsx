import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { isPropertySignature, JsxElement } from 'typescript';
import ROUTES from './../config/routes';

function isAuthenticated() {
  return false;
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
