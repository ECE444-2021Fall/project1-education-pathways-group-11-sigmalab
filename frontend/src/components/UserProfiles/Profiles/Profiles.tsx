import React, { useCallback } from 'react';
import tw from 'twin.macro';
import Profile from './Profile';
import EmptyProfile from './EmptyProfile';
import profiles from '../../../datafillers/profiles';
import { useScheduleEditProps } from '../../../lib/scheduleEdit';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectProfile } from '../../../store/userSlice';

function Profiles(): JSX.Element {
  const currentProfile = useAppSelector((state) => state.user.currentProfile);
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
            numOfCourses: profile.numOfCourses,
            numOfSemesters: profile.numOfSemesters,
          }}
          isDefault={profile.isDefault}
          isCurrent={currentProfile === profile.name}
          editProps={{ ...editProps, selectProfileHandler }}
        />
      ))}
      <EmptyProfile />
    </>
  );
}

export default Profiles;
