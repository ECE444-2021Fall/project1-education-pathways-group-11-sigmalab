import React from 'react';
import tw from 'twin.macro';
import Card from '../../shared/Card';

// interface ProfilesProps {}

function Profiles(): JSX.Element {
  return (
    <>
      <h2 tw='mb-10 text-3xl text-gray-700'>Profiles</h2>
      <Card tw='w-full h-56'>
        <h3>
          My Main Profile<span></span>
          <span></span>
        </h3>
        <p>Courses: ECE423, ECE423, ECE423</p>
        <p>12 courses over 4 semesters</p>
      </Card>
    </>
  );
}

export default Profiles;
