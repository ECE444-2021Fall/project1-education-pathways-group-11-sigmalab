import React from 'react';
import tw from 'twin.macro';

function Profiles(): JSX.Element {
  return (
    <div tw='bg-black flex justify-center items-center h-screen w-screen'>
      <h1 css={[tw`text-5xl text-white`]}>Profiles Page</h1>
    </div>
  );
}

export default Profiles;
