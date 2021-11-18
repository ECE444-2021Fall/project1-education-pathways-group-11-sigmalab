import React, { useCallback } from 'react';
import tw from 'twin.macro';
import Profile from './Profile';
import EmptyProfile from './EmptyProfile';
import { useScheduleEditProps } from '../../../lib/scheduleEdit';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectProfile } from '../../../store/userSlice';

function Profiles(): JSX.Element {
  const [currentProfile, profiles] = useAppSelector((state) => [
    state.user.currentProfile,
    state.user.profiles,
  ]);
  const { editProps } = useScheduleEditProps();
  const dispatch = useAppDispatch();
  const selectProfileHandler = useCallback(
    (name: string) => {
      dispatch(selectProfile(name));
    },
    [dispatch]
  );

  return (
    <>
      <h2 tw='mb-8 text-3xl text-gray-700'>Profiles</h2>
      {profiles.map((profile, index) => (
        <Profile
          key={index}
          name={profile.name}
          courses={profile.courses}
          stats={{
            numOfCourses: profile.numCourses,
            numOfSemesters: profile.numSemesters,
          }}
          isDefault={false}
          isCurrent={currentProfile === profile.name}
          editProps={{ ...editProps, selectProfileHandler }}
        />
      ))}
      <EmptyProfile />
    </>
  );
}

export default Profiles;
