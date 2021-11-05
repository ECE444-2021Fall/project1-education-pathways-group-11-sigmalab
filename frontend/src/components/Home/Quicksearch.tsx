import React, { Fragment, useState } from 'react';
import tw, { TwStyle } from 'twin.macro';
import { Button, Card } from '../shared/';

interface QuicksearchProps {
  defaultSearchTerm: string;
}

function Quicksearch({ defaultSearchTerm }: QuicksearchProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('Search for courses...');
  const onLoad = () => setSearchTerm(defaultSearchTerm);
  const onChange = (e: any) => {
    setSearchTerm(e.target.value);
  };
  const onClick = () => {
    if (searchTerm === defaultSearchTerm) {
      setSearchTerm('');
    }
  };

  return (
    <Fragment>
      <Card tw='w-full flex flex-row justify-center h-36 mb-1'>
        <form tw='justify-center flex-auto w-3/4 h-full'>
          <input
            type='text'
            name='search'
            tw='w-full h-full text-gray-700 rounded-lg border-b-blue-uoft'
            value={searchTerm}
            onLoad={onLoad}
            onChange={onChange}
            onClick={onClick}
          ></input>
        </form>
        <Button variant='primary' tw='flex-auto h-full justify-center ml-1'>
          Search
        </Button>
      </Card>
    </Fragment>
  );
}

export default Quicksearch;
