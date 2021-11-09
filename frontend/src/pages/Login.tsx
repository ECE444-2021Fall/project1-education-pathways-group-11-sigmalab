import React from 'react';
import tw from 'twin.macro';
import { LogoIcon } from '../components/Icons';
import { LoginForm } from '../components/Login';

function Login(): JSX.Element {
  return (
    <div tw='h-screen w-screen flex flex-col justify-center items-center bg-blue-uoft'>
      <div tw='flex flex-row items-center mb-6'>
        <LogoIcon tw='text-black h-16 mr-4' />
        <h1 tw='text-white text-5xl'>Sigma Educate</h1>
      </div>
      <LoginForm />
    </div>
  );
}

export default Login;
