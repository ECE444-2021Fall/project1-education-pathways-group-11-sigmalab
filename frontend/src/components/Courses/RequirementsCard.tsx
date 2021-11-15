import React from 'react';
import tw from 'twin.macro';
import { Typography } from '@mui/material';
import { Card } from '../shared';
import StyledLink from '../shared/StyledLink';

function requirementsCard(
  prerequisites: string | undefined,
  corequisites: string | undefined,
  exclusions: string | undefined
): JSX.Element {
  let reqs: [string, string[]];
  const requirements: Array<typeof reqs> = [];
  if (prerequisites && prerequisites != 'NULL' && prerequisites != '')
    requirements.push(['Pre-Requisites', new String(prerequisites).split(' ')]);
  if (corequisites && corequisites != 'NULL' && corequisites != '')
    requirements.push(['Co-Requisites', new String(corequisites).split(' ')]);
  if (exclusions && exclusions != 'NULL' && exclusions != '')
    requirements.push(['Exclusions', new String(exclusions).split(' ')]);

  const cardBody: JSX.Element[] = [];
  requirements.forEach((element) => {
    cardBody.push(
      <>
        <Typography tw='text-lg font-bold'>{element[0]}</Typography>
        <Typography tw='text-lg padding-left[1rem]'>
          {' '}
          {element[1].forEach((course, id) => (
            <>
              <StyledLink key={id} to={'/courses/' + course}>
                {course}
              </StyledLink>
              {id + 1 === element[1].length ? null : ', '}
            </>
          ))}
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
