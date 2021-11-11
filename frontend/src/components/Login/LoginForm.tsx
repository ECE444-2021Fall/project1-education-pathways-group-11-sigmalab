import React from 'react';
import tw from 'twin.macro';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { BsFillLockFill, BsFillPersonFill } from 'react-icons/bs';
import Input from './Input';
import Button from './Button';
import ROUTES from '../../config/routes';
import { Link } from 'react-router-dom';

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
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = handleSubmit((data) => {
    // TODO: login handler goes here
  });

  return (
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
    </form>
  );
}

export default LoginForm;