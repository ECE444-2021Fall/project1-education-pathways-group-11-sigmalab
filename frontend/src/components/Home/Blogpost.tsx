import React from 'react';
import tw from 'twin.macro';
import { Card } from '../shared';
import { Button } from '../shared';

interface BlogpostProps {
  title: string;
  body: string;
}

function Blogpost({ title, body }: BlogpostProps): JSX.Element {
  return (
    <Card tw='m-2'>
      <h1 tw='text-gray-800 text-2xl w-full'>{title}</h1>
      <p tw='text-gray-600 text-lg'>{body}</p> <br />
    </Card>
  );
}

export default Blogpost;
