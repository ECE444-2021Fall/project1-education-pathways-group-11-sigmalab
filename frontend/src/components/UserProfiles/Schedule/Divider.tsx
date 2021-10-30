import React from 'react';
import tw from 'twin.macro';

interface DividerProps {
  children: string | number;
}

function Divider({ children }: DividerProps): JSX.Element {
  return (
    <div tw='relative overflow-visible flex flex-col justify-center mb-5'>
      <hr tw='border-gray-400 border-t absolute w-full' />
      <span tw='relative capitalize select-none text-sm ml-20 px-4 text-gray-500 bg-gray-light w-min'>
        {children}
      </span>
    </div>
  );
}

export default Divider;
