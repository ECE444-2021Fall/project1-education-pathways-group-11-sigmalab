import React from 'react';
import tw from 'twin.macro';
import Fullsearch from '../components/Search/Fullsearch';

function Search(): JSX.Element {
  return (
    <div tw='flex justify-center items-center h-full w-full'>
      <Fullsearch defaultSearchTerm='Search for courses...' />
    </div>
  );
}

export default Search;
