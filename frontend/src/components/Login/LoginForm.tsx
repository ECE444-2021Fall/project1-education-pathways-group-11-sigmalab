import React, { useState } from 'react';
import tw from 'twin.macro';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { BsFillLockFill, BsFillPersonFill } from 'react-icons/bs';
import Input from './Input';
import Button from './Button';
import ROUTES, { API } from '../../config/routes';
import { Link, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useAppDispatch } from '../../hooks';
import { logUser } from '../../store/userSlice';

export type FormValues = {
  username: string;
  password: string;
};

const schema: yup.SchemaOf<FormValues> = yup
  .object()
  .shape({
    username: yup.string().min(8).defined(),
    password: yup.string().defined(),
  })
  .defined();

function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [, setCookie] = useCookies(['username', 'password']);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [incorrectLoginDetails, setincorrectLoginDetails] = useState(false);

  const { handleSubmit, control } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = handleSubmit((data) => {
    fetch(API.validateLogin, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        } else {
          setCookie('username', data.username, { path: '/' });
          setCookie('password', data.password, { path: '/' });
          dispatch(logUser(data));
          setRedirectToHome(true);
        }
      })
      .catch(() => {
        setincorrectLoginDetails(true);
      });
  });

  return redirectToHome ? (
    <Redirect to={{ pathname: ROUTES.home, state: {} }} />
  ) : (
    <form onSubmit={onSubmit} tw='flex flex-col items-center gap-2'>
      <Input
        placeholder='Username'
        type='text'
        icon={<BsFillPersonFill tw='h-5 w-5' />}
        control={{ control, name: 'username' }}
      />
      <Input
        placeholder='Password'
        type='password'
        icon={<BsFillLockFill tw='h-5 w-5' />}
        control={{ control, name: 'password' }}
      />
      <Button type='submit'>Log In</Button>
      {/* <Button type='button' onClick={() => history.push(ROUTES.signup)}>
        Sign-Up
      </Button> */}
      <Link to={ROUTES.signup} tw='text-blue-200 text-sm hover:underline'>
        Don&apos;t have an account? Sign-up
      </Link>
      {incorrectLoginDetails && (
        <div tw='text-red-900'>
          {' '}
          Incorrect Login Details. Please sign up or try again.
        </div>
      )}
    </form>
  );
}

export default LoginForm;
