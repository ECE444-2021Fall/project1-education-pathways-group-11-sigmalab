import React from 'react';
import { useDrop } from 'react-dnd';
import tw from 'twin.macro';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { ISession, moveCourse } from '../../../store/userSlice';
import { Pill } from '../../shared';
import Course, { CourseProps } from './Course';

interface SessionProps {
  session: ISession;
  year: number;
  showWhenEdit?: boolean;
}

const SessionName = tw.p`text-gray-500 text-lg capitalize mt-0.5`;
const SessionCourses = tw.div`col-span-2 grid gap-2 grid-cols-3 grid-rows-2 mb-2`;

function Session({ session, year }: SessionProps): JSX.Element {
  const [isEditing, currentProfile] = useAppSelector((state) => [
    state.user.isEditing,
    state.user.currentProfile,
  ]);
  const dispatch = useAppDispatch();

  const [{ draggedCourse, hovered }, dropRef] = useDrop(
    () => ({
      accept: 'course',
      drop: (item: CourseProps) => {
        const params = {
          profileName: currentProfile,
          ...item,
          targetYear: year,
          targetSessionName: session.name,
        };
        dispatch(moveCourse(params));
      },
      canDrop: () => !!isEditing,
      collect: (monitor) => ({
        hovered: monitor.isOver(),
        draggedCourse: monitor.getItem<CourseProps>(),
      }),
    }),
    [isEditing, currentProfile, year, session]
  );
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
        {hovered && (
          <Pill tw='grayscale opacity-50'>{draggedCourse.course.name}</Pill>
        )}
      </SessionCourses>
    </div>
  );
}

export default Session;
