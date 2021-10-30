import React from 'react';
import tw from 'twin.macro';
import { Button, Card } from '../../shared';
import StyledLink from '../../shared/StyledLink';
import { AiOutlineEdit } from 'react-icons/ai';

interface ProfileProps {
  name: string;
  courses?: { id: number; name: string }[];
  stats: { numOfCourses: number; numOfSemesters: number };
  isDefault?: boolean;
  isEditing?: boolean;
}

const Details = tw.p`text-lg mb-1 text-gray-600`;
const Tags = tw.span`inline-block text-sm italic text-gray-400 select-none ml-7`;

function Profile({
  name,
  courses,
  stats,
  isDefault = false,
  isEditing = false,
}: ProfileProps): JSX.Element {
  return (
    <Card
      tw='w-full h-56 flex flex-col justify-start mb-10'
      css={isEditing ? tw`border-2 border-green-400` : undefined}
    >
      <h3 tw='mb-3.5 flex items-center'>
        <span tw='text-2xl capitalize inline-block width[20ch] flex-grow-0 truncate'>
          {name}
        </span>
        <AiOutlineEdit
          tw='text-gray-400 h-5 w-auto ml-3 cursor-pointer'
          css={isEditing ? undefined : tw`invisible`}
        />
        {isDefault && <Tags>default</Tags>}
        {isEditing && <Tags>editing</Tags>}
      </h3>
      <Details>
        {'Courses: '}
        {courses?.map((course, id) => (
          <>
            <StyledLink key={id} to='/'>
              {course.name}
            </StyledLink>
            {id + 1 === courses.length ? null : ', '}
          </>
        ))}
      </Details>
      <Details tw='mb-auto'>
        {stats.numOfCourses} courses over {stats.numOfSemesters} semesters
      </Details>
      <div tw='mb-1 flex justify-end items-end'>
        {isEditing ? (
          <>
            <Button variant='light'>Cancel</Button>
            <Button>Save</Button>
          </>
        ) : (
          <>
            {!isDefault && <Button variant='light'>Set Default</Button>}
            <Button>Edit</Button>
          </>
        )}
      </div>
    </Card>
  );
}

export default Profile;
