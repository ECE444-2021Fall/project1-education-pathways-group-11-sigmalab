import React from 'react';
import tw from 'twin.macro';

function Home(): JSX.Element {
  return (
    <div tw='bg-black flex justify-center items-center h-full w-full'>
      <h1 css={[tw`text-5xl text-white`]}>Hello World</h1>
    </div>
  );
}

export default Home;
