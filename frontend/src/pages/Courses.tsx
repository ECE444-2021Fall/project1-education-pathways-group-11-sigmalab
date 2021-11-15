import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';
import Course, { CourseProps } from '../components/Courses/Course';
import ROUTES from '../config/routes';
import axios from 'axios';

//import course from '../datafillers/course';

function Courses(props: any): JSX.Element {
  const code: string = props.match.params['code'];
  const [course, setCourse] = useState<CourseProps>(Object);
  const [error, setError] = useState(0);
  const getCourseInfo = () => {
    axios
      .get(ROUTES.backend + 'getCourse', {
        params: { code: code },
        headers: {},
      })
      .then((response) => setCourse(response.data))
      .catch((error) => {
        setError(1);
      });
  };

  useEffect(() => {
    getCourseInfo();
  }, []);

  if (error) {
    return (
      <div tw='flex justify-center items-center h-full w-full'>
        <h1 tw='text-3xl'> Could not find page: {error} </h1>
      </div>
    );
  }
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
