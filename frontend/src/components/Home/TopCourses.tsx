import React, { Fragment } from 'react';
import tw from 'twin.macro';
import SmallCard from './SmallCard';
import { Card } from '../shared';

function TopCourses(): JSX.Element {
  const cardBody: JSX.Element[] = [];
  cardBody.push(
    SmallCard(
      'ECE444H1',
      'Software Engineering',
      'The software development process. Software requirements and specifications. Software design techniques. Techniques for developing large software systems; CASE tools and software development environments.'
    )
  );
  return (
    <Fragment>
      <Card tw='h-full w-1/2 flex flex-col justify-center mb-1'>
        <h1 tw='flex-auto text-3xl text-blue-uoft'>Most viewed Courses</h1>
        {cardBody}
      </Card>
    </Fragment>
  );
}

export default TopCourses;
