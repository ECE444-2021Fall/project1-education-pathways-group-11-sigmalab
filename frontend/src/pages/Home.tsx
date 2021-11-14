import React, { Fragment } from 'react';
import tw from 'twin.macro';
import Quicksearch from '../components/Home/Quicksearch';
import Whatsnew from '../components/Home/Whatsnew';
import Quickprofile from '../components/Home/Quickprofile';

const StyledSection = tw.section`w-1/2`;

function Home(): JSX.Element {
  return (
    <Fragment>
      <h1 tw='px-20 pt-12 text-5xl justify-center font-bold text-gray-800 mb-10'>
        Sigma Educate
      </h1>
      <div tw='h-full w-full px-20'>
        <div tw='flex flex-row justify-center mb-10'>
          <Quicksearch defaultSearchTerm='Search for courses...' />
        </div>
        <div tw='flex flex-row'>
          <Quickprofile tw='flex-1 h-full' />
          <Whatsnew tw='flex-1 h-screen'></Whatsnew>
        </div>

        {/* <h1 css={[tw`text-5xl text-white`]}>Hello World</h1> */}
      </div>
    </Fragment>
  );
}

export default Home;
