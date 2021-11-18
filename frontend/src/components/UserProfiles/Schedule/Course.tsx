import React from 'react';
import { useDrag } from 'react-dnd';
import tw from 'twin.macro';
import { useAppSelector } from '../../../hooks';
import { ICourse, TSessionName } from '../../../store/userSlice';
import { Pill } from '../../shared';

export interface CourseProps {
  course: ICourse;
  year: number;
  sessionName: TSessionName;
  isEditing?: boolean;
}

function Course({ course, year, sessionName }: CourseProps): JSX.Element {
  const isEditing = useAppSelector((state) => state.user.isEditing);
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'course',
      item: { course, year, sessionName },
      canDrag: () => !!isEditing,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [isEditing, course, year, sessionName]
  );

  return (
    <Pill
      ref={dragRef}
      css={isDragging ? tw`opacity-0 order-last` : tw`opacity-100`}
    >
      {course.name.slice(0, -2)}
    </Pill>
  );
}

export default Course;
