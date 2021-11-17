import React from 'react';
import tw from 'twin.macro';
import { useAppSelector } from '../../../hooks';
import { TSchedule } from '../../../store/userSlice';
import { Divider } from '../../shared';
import Session from './Session';

interface ScheduleSectionProps {
  schedule: TSchedule;
}

const yearFormatter = (year: number) => (year < 1 ? 'unassigned' : year);

function ScheduleSection({ schedule }: ScheduleSectionProps): JSX.Element {
  const isEditing = useAppSelector((state) => state.user.isEditing);
  return (
    <>
      {schedule.map((year, yearKey) => {
        const notEmpty =
          year.sessions.reduce(
            (numCourses, session) => numCourses + session.courses.length,
            0
          ) != 0;
        return (
          (notEmpty || isEditing) && (
            <article tw='w-2/3 my-5' key={yearKey}>
              <Divider>{yearFormatter(year.year)}</Divider>
              <div tw='flex flex-col justify-start items-stretch'>
                {year.sessions.map((session, sessionKey) => (
                  <Session
                    session={session}
                    year={year.year}
                    key={sessionKey + 1000 * yearKey}
                  />
                ))}
              </div>
            </article>
          )
        );
      })}
    </>
  );
}

export default ScheduleSection;
