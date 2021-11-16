import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import tw from 'twin.macro';
import { ICourse, TSessionName } from '../../../store/userSlice';
import { Pill } from '../../shared';

export interface CourseProps {
  course: ICourse;
  year: number;
  sessionName: TSessionName;
  isEditing?: boolean;
}

function Course({
  course,
  year,
  sessionName,
  isEditing,
}: CourseProps): JSX.Element {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'course',
      item: { course, year, sessionName },
      canDrag: () => !!isEditing,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [course, year, sessionName]
  );

  return (
    <Pill ref={dragRef} css={isDragging ? tw`opacity-0` : tw`opacity-100`}>
      {course.name}
    </Pill>
  );
}

export default Course;
