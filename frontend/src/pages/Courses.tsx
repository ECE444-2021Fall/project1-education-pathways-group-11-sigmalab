import React from 'react';
import Course from '../components/Courses';
import course from '../datafillers/course';

function Courses(): JSX.Element {
  return (
    <Course
      code={course.code}
      name={course.name}
      division={course.division}
      department={course.department}
      campus={course.campus}
      description={course.description}
      lastUpdated={course.lastUpdated}
      offered={course.offered}
      prerequisites={course.prerequisites}
      corequisites={course.corequisites}
      exclusions={course.exclusions}
    />
  );
}

export default Courses;
