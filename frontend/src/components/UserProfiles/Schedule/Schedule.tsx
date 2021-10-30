import React from 'react';
import tw from 'twin.macro';
import ScheduleSection from './ScheduleSection';
import schedule from '../../../datafillers/schedules';

// interface ScheduleProps {}

function Schedule(): JSX.Element {
  return (
    <>
      <h2 tw='mb-10'>Current Schedule</h2>
      {schedule.map((section, sectionIdx) => (
        <ScheduleSection
          key={sectionIdx}
          name={section.year || 'unassigned'}
          sessions={section.semesters}
          unLabeled={section.unLabeled}
        />
      ))}
      {/* <ScheduleSection name={}/> */}
    </>
  );
}

export default Schedule;
