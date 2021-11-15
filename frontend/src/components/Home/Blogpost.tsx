import React from 'react';
import tw from 'twin.macro';
import { Card } from '../shared';
import { Button } from '../shared';

function Blogpost(): JSX.Element {
  return (
    <Card tw='m-2'>
      <h1 tw='text-gray-800 text-2xl w-full'>Sample Post</h1>
      <p tw='text-gray-600 text-lg'>This is a test post.</p> <br />
      <Button variant='primary' tw='justify-center'>
        Read More
      </Button>
    </Card>
  );
}

export default Blogpost;
