import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import tw from 'twin.macro';
import { FormValues } from './LoginForm';

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  icon?: JSX.Element;
  control: UseControllerProps<FormValues>;
}

function Input({ icon, control, ...props }: InputProps): JSX.Element {
  const {
    field,
    fieldState: { error },
  } = useController(control);
  console.log(error);
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
      {error && <p tw='text-center text-red-600 text-xs'>{error.message}</p>}
    </>
  );
}

export default Input;
