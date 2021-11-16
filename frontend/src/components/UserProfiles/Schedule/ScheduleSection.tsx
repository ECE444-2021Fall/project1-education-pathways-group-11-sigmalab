import React from 'react';
import tw from 'twin.macro';
import { TSchedule } from '../../../store/userSlice';
import { Divider } from '../../shared';
import Session from './Session';

interface ScheduleSectionProps {
  schedule: TSchedule;
}

const yearFormatter = (year: number) => (year < 1 ? 'unassigned' : year);

function ScheduleSection({ schedule }: ScheduleSectionProps): JSX.Element {
  return (
    <>
      {schedule.map((year, yearKey) => (
        <article tw='w-2/3 my-5' key={yearKey}>
          <Divider>{yearFormatter(year.year)}</Divider>
          <div tw='flex flex-col justify-start items-stretch'>
            {year.sessions.map((session, sessionKey) => (
              <Session
                session={session}
                year={year.year}
                key={sessionKey + 1000 * yearKey}
                isEditing
              />
            ))}
          </div>
        </article>
      ))}
    </>
  );
}

export default ScheduleSection;
