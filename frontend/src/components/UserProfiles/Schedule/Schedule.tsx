import React from 'react';
import tw from 'twin.macro';
import ScheduleSection from './ScheduleSection';
import { useAppSelector } from '../../../hooks';

function Schedule(): JSX.Element {
  const schedule = useAppSelector((state) => state.user.profiles)?.[0]
    ?.schedule;
  return (
    <>
      <h2 tw='mb-8 text-3xl text-gray-700'>Current Schedule</h2>
      {schedule ? (
        <ScheduleSection schedule={schedule} />
      ) : (
        <h4 tw='text-xl text-gray-400 w-full text-center'>
          Please select/create a profile
        </h4>
      )}
    </>
  );
}

export default Schedule;
