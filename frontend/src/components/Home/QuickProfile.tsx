import React from 'react';
import tw from 'twin.macro';
import { Card } from '../shared';
import { Profiles } from '..//UserProfiles';

function QuickProfile(): JSX.Element {
  return (
    <Card tw='w-1/2 h-full mr-5'>
      <Profiles />
    </Card>
  );
}

export default QuickProfile;
