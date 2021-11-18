import React, { Fragment, useEffect, useState } from 'react';
import tw from 'twin.macro';
import SmallCard from './SmallCard';
import { Card } from '../shared';
import axios from 'axios';
import ROUTES from '../../config/routes';
import { CourseProps } from '../Courses/Course';
import { useHistory } from 'react-router';

function TopCourses(): JSX.Element {
  const [cardBody, setCardBody] = useState<JSX.Element[]>([]);
  const history = useHistory();

  useEffect(() => {
    async function getCourseInfo() {
      axios
        .get(ROUTES.backend + '/topCourses', {
          params: { n: 3 },
          headers: {},
        })
        .then((response) => {
          setCardBody(parseCourses(response.data[0]));
        })
        .catch();
    }
    getCourseInfo();
  });

  function parseCourses(courses: CourseProps[]): JSX.Element[] {
    const arr = [];
    for (const course of courses) {
      arr.push(
        SmallCard(course.code, course.name, course.course_description, history)
      );
    }
    return arr;
  }

  return (
    <Fragment>
      <Card tw='h-full w-1/2 flex flex-col justify-center mb-1'>
        <h1 tw='flex-auto text-3xl text-blue-uoft'>Most viewed Courses</h1>
        {cardBody}
      </Card>
    </Fragment>
  );
}

export default TopCourses;
