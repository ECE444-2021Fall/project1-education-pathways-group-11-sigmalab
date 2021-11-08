import React from 'react';
import tw from 'twin.macro';
import { Divider, Pill } from '../../shared';

interface ScheduleSectionProps {
  name: string | number;
  unLabeled: boolean;
  sessions: { name: string; courses: { id: number; name: string }[] }[];
  [rest: string]: any;
}

const SessionName = tw.p`text-gray-500 text-lg capitalize mt-0.5`;
const SessionCourses = tw.div`col-span-2 grid gap-2 grid-cols-3 mb-2`;

function ScheduleSection({
  name,
  sessions,
  unLabeled,
}: ScheduleSectionProps): JSX.Element {
  return (
    <article tw='w-2/3 my-5'>
      <Divider>{name}</Divider>
      <div tw='grid grid-cols-3 gap-y-4'>
        {sessions.map((session, sessionKey) => (
          <>
            {unLabeled ? null : (
              <SessionName key={sessionKey}>{session.name}</SessionName>
            )}
            <SessionCourses
              key={sessionKey}
              css={unLabeled ? tw`grid-cols-5 col-span-full` : ''}
            >
              {session.courses.map((course, courseIndex) => (
                <Pill key={courseIndex}>{course.name}</Pill>
              ))}
            </SessionCourses>
          </>
        ))}
      </div>
    </article>
  );
}

export default ScheduleSection;
