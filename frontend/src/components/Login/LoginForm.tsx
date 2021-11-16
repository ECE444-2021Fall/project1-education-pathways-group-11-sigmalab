import React, { useState } from 'react';
import tw from 'twin.macro';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { BsFillLockFill, BsFillPersonFill } from 'react-icons/bs';
import Input from './Input';
import Button from './Button';
import ROUTES from '../../config/routes';
import { Link, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies(['username', 'password']);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [incorrectLoginDetails, setincorrectLoginDetails] = useState(false);

  const { handleSubmit, control } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = handleSubmit((data) => {
    fetch('http://localhost:5000/validateLogin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        //console.log(response);
        if (!(response.status === 201)) {
          throw new Error(response.statusText);
        } else {
          setCookie('username', data.username, { path: '/' });
          setCookie('password', data.password, { path: '/' });
          setRedirectToHome(true);
          //return 'Valid';
        }
      })
      .catch((err) => {
        //console.log(err);
        //Give user feedback:
        setincorrectLoginDetails(true);
      });
  });

  return redirectToHome ? (
    <Redirect to={ROUTES.home} />
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
