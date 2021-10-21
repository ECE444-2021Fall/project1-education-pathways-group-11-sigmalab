import React from 'react';
import tw from 'twin.macro';
import * as types from 'styled-components/cssprop';

function App(): JSX.Element {
  return (
    <div tw='bg-black flex justify-center items-center h-screen w-screen'>
      <h1 css={[tw`text-5xl text-white`]}>Hello World</h1>
    </div>
  );
}

export default App;
