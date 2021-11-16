import React from 'react';
import tw from 'twin.macro';
import ScheduleSection from './ScheduleSection';
import { useAppSelector } from '../../../hooks';
import EditControls from './EditControls';
import { useScheduleEditProps } from '../../../lib/scheduleEdit';

function Schedule(): JSX.Element {
  const { isEditing, editProps } = useScheduleEditProps();
  const schedule = useAppSelector((state) => state.user.profiles)?.[0]
    ?.schedule;
  return (
    <>
      <div tw='flex flex-row justify-between w-2/3'>
        <h2 tw=' text-3xl text-gray-700 '>Current Schedule</h2>
        <EditControls {...editProps} />
      </div>
      {schedule ? (
        <ScheduleSection schedule={schedule} {...isEditing} />
      ) : (
        <h4 tw='text-xl text-gray-400 w-full text-center'>
          Please select/create a profile
        </h4>
      )}
    </>
  );
}

export default Schedule;
