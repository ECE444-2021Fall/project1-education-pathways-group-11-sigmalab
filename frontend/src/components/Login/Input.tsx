import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import tw from 'twin.macro';
import { FormValues as LoginVals } from './LoginForm';
import { FormValuesWConfirm as SignupVals } from './SignupForm';

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  icon?: JSX.Element;
  control: UseControllerProps<LoginVals>;
}
interface InputPropsE extends React.ComponentPropsWithoutRef<'input'> {
  icon?: JSX.Element;
  control: UseControllerProps<SignupVals>;
}

export function Input({ icon, control, ...props }: InputProps): JSX.Element {
  const {
    field,
    fieldState: { error },
  } = useController(control);
  return (
    <>
      <div tw='relative flex flex-col justify-center w-64'>
        <label htmlFor={props.name} tw='text-white absolute left-5 cursor-text'>
          {icon}
        </label>
        <input
          id={props.name}
          tw='px-4 py-3 bg-transparent border border-gray-300 
        text-gray-200 rounded-md pl-14'
          {...props}
          {...field}
        />
      </div>
      {error && (
        <p tw='text-center -mt-2 text-red-600 text-xs'>{error.message}</p>
      )}
    </>
  );
}

export function InputE({ icon, control, ...props }: InputPropsE): JSX.Element {
  const {
    field,
    fieldState: { error },
  } = useController(control);
  return (
    <>
      <div tw='relative flex flex-col justify-center w-64'>
        <label htmlFor={props.name} tw='text-white absolute left-5 cursor-text'>
          {icon}
        </label>
        <input
          id={props.name}
          tw='px-4 py-3 bg-transparent border border-gray-300 
        text-gray-200 rounded-md pl-14'
          {...props}
          {...field}
        />
      </div>
      {error && (
        <p tw='text-center -mt-2 text-red-600 text-xs'>{error.message}</p>
      )}
    </>
  );
}
