import React from 'react';
import tw from 'twin.macro';
import { Schedule, Profiles } from '../components/UserProfiles';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const StyledSection = tw.section`w-1/2`;

function ProfilesPage(): JSX.Element {
  return (
    <div tw='px-20 pt-12'>
      <h1 tw='text-5xl font-bold text-gray-800 mb-10'>User Profiles</h1>
      <div tw='flex flex-row justify-start'>
        <StyledSection>
          <DndProvider backend={HTML5Backend}>
            <Schedule />
          </DndProvider>
        </StyledSection>
        <StyledSection>
          <Profiles />
        </StyledSection>
      </div>
    </div>
  );
}

export default ProfilesPage;
