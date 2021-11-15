import React from 'react';
import tw from 'twin.macro';
import ScheduleSection from './ScheduleSection';
import schedule from '../../../datafillers/schedules';

function Schedule(): JSX.Element {
  return (
    <>
      <h2 tw='mb-8 text-3xl text-gray-700'>Current Schedule</h2>
      <ScheduleSection schedule={schedule} />
    </>
  );
}

export default Schedule;
