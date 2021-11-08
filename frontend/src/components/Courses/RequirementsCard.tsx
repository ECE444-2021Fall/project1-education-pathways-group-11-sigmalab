import React from 'react';
import tw from 'twin.macro';
import { Typography } from '@mui/material';
import { Card } from '../shared';
import StyledLink from '../shared/StyledLink';

function requirementsCard(
  prerequisites: string[],
  corequisites: string[],
  exclusions: string[]
): JSX.Element {
  const requirements = [];
  if (prerequisites.length)
    requirements.push(['Pre-Requisites', prerequisites]);
  if (corequisites.length) requirements.push(['Co-Requisites', corequisites]);
  if (exclusions.length) requirements.push(['Exclusions', exclusions]);

  const cardBody: JSX.Element[] = [];
  requirements.forEach((element) => {
    cardBody.push(
      <>
        <Typography tw='text-lg font-bold'>{element[0]}</Typography>
        <Typography tw='text-lg padding-left[1rem]'>
          <>
            {Array.isArray(element[1]) ? (
              element[1].forEach((course) => {
                <StyledLink to='/'>{course}</StyledLink>;
              })
            ) : (
              <StyledLink to='/'>{element[1]}</StyledLink>
            )}
          </>
        </Typography>
      </>
    );
  });

  return (
    <div tw='padding[1rem]'>
      <Card tw=''>
        <Typography variant='h6' gutterBottom>
          Requirements
        </Typography>
        {cardBody}
      </Card>
    </div>
  );
}

export default requirementsCard;
