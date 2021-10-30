import React from 'react';
import tw from 'twin.macro';
import Profile from './Profile';
import EmptyProfile from './EmptyProfile';
import profiles from '../../../datafillers/profiles';

function Profiles(): JSX.Element {
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
          isEditing={profile.isEditing}
        />
      ))}
      <EmptyProfile />
    </>
  );
}

export default Profiles;
