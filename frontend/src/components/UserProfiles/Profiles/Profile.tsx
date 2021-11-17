import React from 'react';
import tw from 'twin.macro';
import { Button, Card } from '../../shared';
import StyledLink from '../../shared/StyledLink';
import { AiOutlineEdit } from 'react-icons/ai';
import { IEditProps } from '../../../lib/scheduleEdit';
import { useGetProfile } from '../../../lib/queries';
import { CircularProgress } from '@mui/material';
import { useAppDispatch } from '../../../hooks';
import { updateProfile } from '../../../store/userSlice';

interface ProfileProps {
  name: string;
  courses?: { id: number; name: string }[];
  stats: { numOfCourses: number; numOfSemesters: number };
  isDefault?: boolean;
  isCurrent?: boolean;
  editProps: IEditProps & {
    selectProfileHandler: (name: string) => void;
  };
}

const Details = tw.p`text-lg mb-1 text-gray-600`;
const Tags = tw.span`inline-block text-sm italic text-gray-400 select-none ml-7`;

function Profile({
  name,
  courses,
  stats,
  isDefault = false,
  isCurrent = false,
  editProps,
}: ProfileProps): JSX.Element {
  const profileQuery = useGetProfile(name, isCurrent);
  const dispatch = useAppDispatch();
  const { isEditing } = editProps;
  const currentlyEditing = isEditing && isCurrent;
  const selectProfileHandler = () => {
    !isEditing && editProps.selectProfileHandler(name);
  };
  if (!profileQuery.isSuccess) {
    return (
      <Card tw='w-full h-56 flex flex-col justify-center items-center mb-10'>
        <CircularProgress />
      </Card>
    );
  }
  dispatch(updateProfile(profileQuery.data));
  return (
    <Card
      tw='w-full h-56 flex flex-col justify-start mb-10'
      css={[
        isCurrent ? tw`border-2 border-green-400` : undefined,
        !isEditing ? tw`cursor-pointer` : undefined,
      ]}
      onClick={selectProfileHandler}
    >
      <h3 tw='mb-3.5 flex items-center'>
        <span tw='text-2xl capitalize inline-block width[20ch] flex-grow-0 truncate'>
          {name}
          {isDefault && <Tags tw='lowercase'>default</Tags>}
        </span>
        <AiOutlineEdit
          tw='text-gray-400 h-5 w-auto ml-3 cursor-pointer'
          css={currentlyEditing ? undefined : tw`invisible`}
        />
        {currentlyEditing && <Tags>editing</Tags>}
      </h3>
      <Details>
        {'Courses: '}
        {courses?.map((course, id) => (
          <React.Fragment key={id}>
            <StyledLink to='/'>{course.name}</StyledLink>
            {id + 1 === courses.length ? null : ', '}
          </React.Fragment>
        ))}
      </Details>
      <Details tw='mb-auto'>
        {stats.numOfCourses} courses over {stats.numOfSemesters} semesters
      </Details>
      <div tw='mb-1 flex justify-end items-end'>
        {currentlyEditing ? (
          <>
            <Button onClick={editProps.cancelHandler} variant='light'>
              Cancel
            </Button>
            <Button onClick={editProps.saveHandler}>Save</Button>
          </>
        ) : (
          !isEditing && <Button onClick={editProps.editHandler}>Edit</Button>
        )}
        {!isDefault && (
          <Button variant='light' tw=' order-first'>
            Set Default
          </Button>
        )}
      </div>
    </Card>
  );
}

export default Profile;
