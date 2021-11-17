import React from 'react';
import tw from 'twin.macro';
import { Card } from '../shared';
import { Button } from '../shared';
import { useHistory } from 'react-router';

function SmallCard(
  code: string,
  title: string,
  description: string
): JSX.Element {
  const history = useHistory();
  return (
    <Card tw='m-2 h-auto'>
      <h1 tw='text-gray-800 text-2xl w-full'>{code + ': ' + title}</h1>
      <p tw='text-gray-600 text-lg'>
        {description.substring(0, 140) + '...'}
      </p>{' '}
      <br />
      <Button
        variant='primary'
        tw='justify-center'
        onClick={() => {
          history.push('/courses/' + code);
        }}
      >
        Read More
      </Button>
    </Card>
  );
}

export default SmallCard;
