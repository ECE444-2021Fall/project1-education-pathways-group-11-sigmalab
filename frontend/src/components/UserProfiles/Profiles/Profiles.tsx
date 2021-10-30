import React from 'react';
import tw from 'twin.macro';
import { Button, Card } from '../../shared';

// interface ProfilesProps {}

const Details = tw.p`text-lg mb-1 text-gray-600`;

function Profiles(): JSX.Element {
  return (
    <>
      <h2 tw='mb-10 text-3xl text-gray-700'>Profiles</h2>
      <Card tw='w-full h-56 flex flex-col justify-start'>
        <h3 tw='text-2xl mb-3.5'>My Main Profile </h3>
        <Details>Courses: ECE423, ECE423, ECE423</Details>
        <Details tw='mb-auto'>12 courses over 4 semesters</Details>
        <div tw='mb-1 flex justify-end items-end'>
          <Button variant='light'>Set Default</Button>
          <Button>Edit</Button>
        </div>
      </Card>
    </>
  );
}

export default Profiles;
