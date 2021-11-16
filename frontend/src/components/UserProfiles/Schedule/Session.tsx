import React from 'react';
import { useDrop } from 'react-dnd';
import tw from 'twin.macro';
import { useAppDispatch } from '../../../hooks';
import { ISession, moveCourse } from '../../../store/userSlice';
import Course, { CourseProps } from './Course';

interface SessionProps {
  session: ISession;
  year: number;
  isEditing?: boolean;
}

const SessionName = tw.p`text-gray-500 text-lg capitalize mt-0.5`;
const SessionCourses = tw.div`col-span-2 grid gap-2 grid-cols-3 grid-rows-2 mb-2`;

function Session({ session, year, isEditing }: SessionProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [{ hovered }, dropRef] = useDrop(() => ({
    accept: 'course',
    drop: (item: CourseProps) => {
      const params = {
        profileName: 'main',
        ...item,
        targetYear: year,
        targetSessionName: session.name,
      };
      dispatch(moveCourse(params));
    },
    canDrop: () => !!isEditing,
    collect: (monitor) => ({
      hovered: monitor.isOver(),
    }),
  }));
  const unLabeled = year <= 0;

  return (
    <div ref={dropRef} tw=' grid grid-cols-3 gap-y-4 relative my-1'>
      {hovered && (
        <div
          tw='absolute box-content -left-4 -top-2 h-full w-full
         bg-blue-400 px-4 py-1 opacity-30 z-10 pointer-events-none
         rounded-2xl'
        />
      )}
      {unLabeled ? null : <SessionName>{session.name}</SessionName>}
      <SessionCourses css={unLabeled ? tw`grid-cols-5 col-span-full` : ''}>
        {session.courses.map((course, courseKey) => (
          <Course
            key={courseKey}
            course={course}
            year={year}
            sessionName={session.name}
            isEditing
          />
        ))}
      </SessionCourses>
    </div>
  );
}

export default Session;
