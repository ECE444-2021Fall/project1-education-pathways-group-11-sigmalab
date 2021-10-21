import React from 'react';
import tw from 'twin.macro';

function Course(): JSX.Element {
  return (
    <div tw='bg-black flex justify-center items-center h-screen w-screen'>
      <h1 css={[tw`text-5xl text-white`]}>Course Page</h1>
    </div>
  );
}

export default Course;
