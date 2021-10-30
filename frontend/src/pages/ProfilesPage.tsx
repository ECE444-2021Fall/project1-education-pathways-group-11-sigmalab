import React from 'react';
import tw from 'twin.macro';
import { Schedule, Profiles } from '../components/UserProfiles';

const StyledSection = tw.section`w-1/2`;

function ProfilesPage(): JSX.Element {
  return (
    <div tw='px-20 pt-14'>
      <h1 tw='text-5xl font-bold text-black mb-10'>User Profiles</h1>
      <div tw='flex flex-row justify-start text-3xl'>
        <StyledSection>
          <Schedule />
        </StyledSection>
        <StyledSection>
          <Profiles />
        </StyledSection>
      </div>
    </div>
  );
}

export default ProfilesPage;