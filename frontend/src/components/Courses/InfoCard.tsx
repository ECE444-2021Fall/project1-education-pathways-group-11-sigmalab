import React from 'react';
import tw from 'twin.macro';
import { Typography } from '@mui/material';
import { Card } from '../shared';

function InfoCard(
  code: string,
  division: string,
  department: string,
  campus: string
): JSX.Element {
  const infoList = [
    ['Course code', code],
    ['Division', division],
    ['Department', department],
    ['Campus', campus],
  ];
  const cardBody: JSX.Element[] = [];
  infoList.forEach((element) => {
    cardBody.push(
      <>
        <Typography tw='text-lg font-bold'>{element[0]}</Typography>
        <Typography tw='text-lg font-style[italic] text-gray-600 padding-left[1rem]'>
          {element[1]}
        </Typography>
      </>
    );
  });
  return (
    <div tw='padding[1rem]'>
      <Card>
        <Typography variant='h6' gutterBottom>
          Quick Info
        </Typography>
        {cardBody}
      </Card>
    </div>
  );
}

export default InfoCard;
