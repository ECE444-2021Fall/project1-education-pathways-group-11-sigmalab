import React from 'react';
import tw from 'twin.macro';
import { ISession } from '../../../store/userSlice';
import Course from './Course';

interface SessionProps {
  session: ISession;
  year: number;
}

const SessionName = tw.p`text-gray-500 text-lg capitalize mt-0.5`;
const SessionCourses = tw.div`col-span-2 grid gap-2 grid-cols-3 mb-2`;

function Session({ session, year }: SessionProps): JSX.Element {
  const unLabeled = year <= 0;
  return (
    <div tw='grid grid-cols-3 gap-y-4'>
      {unLabeled ? null : <SessionName>{session.name}</SessionName>}
      <SessionCourses css={unLabeled ? tw`grid-cols-5 col-span-full` : ''}>
        {session.courses.map((course, courseKey) => (
          <Course key={courseKey} course={course} />
        ))}
      </SessionCourses>
    </div>
  );
}

export default Session;
