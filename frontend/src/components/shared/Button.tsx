import React from 'react';
import styled from 'styled-components';
import tw, { TwStyle } from 'twin.macro';

type ButtonVariant = 'primary' | 'light' | 'smallPrimary';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
}

const buttonVariants: Record<ButtonVariant, TwStyle> = {
  primary: tw`text-white
	before:(content rounded-lg bg-blue-uoft absolute -z-10 inset-0)
	hover:before:brightness-125
	active:before:brightness-75
	`,
  smallPrimary: tw`text-white
	before:(content rounded-lg bg-blue-uoft absolute -z-10 inset-0)
	hover:before:brightness-125
	active:before:brightness-75
	`,
  light: tw`text-gray-400 bg-none
	hover:(underline brightness-75)
	active:brightness-50
	`,
};

const Button = styled.button<ButtonProps>(() => [
  tw`w-24 h-10 z-10 text-sm relative select-none`,
  ({ variant = 'primary' }) => buttonVariants[variant],
]);

export default Button;
