import React from 'react';
import tw from 'twin.macro';
import { Card } from '../../shared';

function EmptyProfile(): JSX.Element {
  return (
    <Card
      tw='w-full h-56 bg-transparent border-2 border-dashed
			border-gray-300 shadow-none cursor-pointer
			grid grid-cols-1 place-items-center
			hover:(shadow-lg brightness-75)
			active:(brightness-50)'
    >
      <span tw='text-6xl select-none text-gray-300'>+</span>
    </Card>
  );
}

export default EmptyProfile;
