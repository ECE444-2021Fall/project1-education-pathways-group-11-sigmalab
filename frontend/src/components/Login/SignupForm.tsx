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
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { username: '', password: '', confirmPassword: '' },
  });

  const onSubmit = handleSubmit((data) => {
    // TODO: signup handler goes here
  });

  return (
    <form onSubmit={onSubmit} tw='flex flex-col items-center gap-2'>
      <Input
        placeholder='Username'
        type='text'
        icon={<BsFillPersonFill tw='h-5 w-max' />}
        control={{ control, name: 'username' }}
      />
      <Input
        placeholder='Password'
        type='password'
        icon={<BsFillLockFill tw='h-5 w-max' />}
        control={{ control, name: 'password' }}
      />
      <Input
        placeholder='Confirm Password'
        type='password'
        icon={<BsFillLockFill tw='h-5 w-max' />}
        control={{
          control,
          name: 'confirmPassword',
        }}
      />
      <Button type='submit'>Sign Up</Button>
      <Link to={ROUTES.login} tw='text-blue-200 text-sm hover:underline'>
        Already have an account? Log In
      </Link>
    </form>
  );
}

export default SignupForm;
