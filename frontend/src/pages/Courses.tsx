import React, { useState } from 'react';
import { Course, CourseProps } from '../components/Courses';
//import course from '../datafillers/course';

function Courses(): JSX.Element {
  const [courseInfo, setCourseInfo] = useState(CourseProps);
  fetch('http://localhost:5000/getCourse?code=ECE444H1')
    .then((res) => res.json())
    .then((json) => {
      course = json;
    });

  return <p>{course}</p>;

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
