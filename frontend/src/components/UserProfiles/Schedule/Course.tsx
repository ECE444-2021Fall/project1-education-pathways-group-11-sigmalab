import React from 'react';
import { useDrag } from 'react-dnd';
import tw from 'twin.macro';
import { useAppSelector } from '../../../hooks';
import { ICourse, TSessionName } from '../../../store/userSlice';
import { Pill } from '../../shared';

interface crs extends ICourse {
  code?: string;
}
export interface CourseProps {
  course: crs;
  year: number;
  sessionName: TSessionName;
  isEditing?: boolean;
}

function Course({ course, year, sessionName }: CourseProps): JSX.Element {
  const typedCourse: ICourse = {
    id: course.id,
    // eslint-disable-next-line
    name: course.code!,
    views: course.views,
  };
  const isEditing = useAppSelector((state) => state.user.isEditing);
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'course',
      item: { typedCourse, year, sessionName },
      canDrag: () => !!isEditing,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [isEditing, typedCourse, year, sessionName]
  );

  return (
    <Pill
      ref={dragRef}
      css={isDragging ? tw`opacity-0 order-last` : tw`opacity-100`}
    >
      {typedCourse.name?.slice(0, -2)}
    </Pill>
  );
}

export default Course;
