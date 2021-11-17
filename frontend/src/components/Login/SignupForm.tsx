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
  confirmPassword: string;
};

const schema: yup.SchemaOf<FormValues> = yup
  .object()
  .shape({
    username: yup.string().min(8).defined(),
    password: yup.string().defined(),
    confirmPassword: yup
      .string()
      .equals([yup.ref('password')], 'Passwords do not match')
      .defined(),
  })
  .defined();

function SignupForm(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies(['username', 'password']);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [accountAlreadyExists, setAccountAlreadyExists] = useState(false);
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { username: '', password: '', confirmPassword: '' },
  });

  const onSubmit = handleSubmit((data) => {
    const { username, password } = data;
    fetch('http://localhost:5000/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!(response.status === 200)) {
          throw new Error(response.statusText);
        } else {
          setCookie('username', data.username, { path: '/' });
          setCookie('password', data.password, { path: '/' });
          setRedirectToHome(true);
        }
      })
      .catch((err) => {
        setAccountAlreadyExists(true);
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
      <Input
        placeholder='Confirm Password'
        type='password'
        icon={<BsFillLockFill tw='h-5 w-5' />}
        control={{
          control,
          name: 'confirmPassword',
        }}
      />
      <Button type='submit'>Sign Up</Button>
      <Link to={ROUTES.login} tw='text-blue-200 text-sm hover:underline'>
        Already have an account? Log In
      </Link>
      {accountAlreadyExists && (
        <div tw='text-red-900'>
          {' '}
          Account already exists. Please use login or create a different
          account.
        </div>
      )}
    </form>
  );
}

export default SignupForm;
