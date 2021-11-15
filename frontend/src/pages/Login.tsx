import React from 'react';
import { Route, Switch } from 'react-router';
import tw from 'twin.macro';
import { LogoIcon } from '../components/Icons';
import { LoginForm, SignupForm } from '../components/Login';
import ROUTES from '../config/routes';

function Login(): JSX.Element {
  return (
    <div tw='h-screen w-screen flex flex-col justify-center items-center bg-blue-uoft'>
      <div tw='flex flex-row items-center mb-6'>
        <LogoIcon tw='text-black h-16 mr-4' />
        <h1 tw='text-white text-5xl'>Sigma Educate</h1>
      </div>
      <Switch>
        <Route path={ROUTES.login}>
          <LoginForm />
        </Route>
        <Route path={ROUTES.signup}>
          <SignupForm />
        </Route>
      </Switch>
    </div>
  );
}

export default Login;
