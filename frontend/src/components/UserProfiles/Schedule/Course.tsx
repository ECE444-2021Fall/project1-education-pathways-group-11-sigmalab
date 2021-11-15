import React from 'react';
import tw from 'twin.macro';
import { ICourse } from '../../../store/userSlice';
import { Pill } from '../../shared';

interface CourseProps {
  course: ICourse;
}

function Course({ course }: CourseProps): JSX.Element {
  return <Pill>{course.name}</Pill>;
}

export default Course;
