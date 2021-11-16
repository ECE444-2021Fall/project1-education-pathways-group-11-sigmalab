import React, { useEffect, useState } from 'react';
import Course, { CourseProps } from '../components/Courses/Course';
import ROUTES from '../config/routes';
import axios from 'axios';

//import course from '../datafillers/course';

function Courses(props: any): JSX.Element {
  const code: string = props.match.params['code'];
  const [course, setCourse] = useState<CourseProps>(Object);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getCourseInfo() {
      axios
        .get(ROUTES.backend + '/getCourse', {
          params: { code: code },
          headers: {},
        })
        .then((response) => {
          setCourse(response.data[0]);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
    getCourseInfo();
  }, [code]);

  if (error != '') {
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
      course_description={course.course_description}
      last_updated={course.last_updated}
      term={course.term}
      pre_requisites={course.pre_requisites}
      corequisite={course.corequisite}
      exclusion={course.exclusion}
    />
  );
}

export default Courses;
