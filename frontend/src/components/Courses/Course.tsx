import React from 'react';
import tw from 'twin.macro';
import { Box, Grid, Typography } from '@mui/material';
import { Card } from '../shared';
import InfoCard from './InfoCard';
import RequirementsCard from './RequirementsCard';

export interface CourseProps {
  code: string;
  name: string;
  division: string;
  department: string;
  campus: string;
  description: string;
  lastUpdated: string;
  offered?: string[];
  prerequisites?: string[];
  corequisites?: string[];
  exclusions?: string[];
}
function Course({
  code,
  name,
  division,
  department,
  campus,
  description,
  lastUpdated,
  offered = [],
  prerequisites = [],
  corequisites = [],
  exclusions = [],
}: CourseProps): JSX.Element {
  const wideCol = [
    card('Description', [description]),
    RequirementsCard(prerequisites, corequisites, exclusions),
  ];
  const narrowCol = [InfoCard(code, division, department, campus)];
  if (offered.length) narrowCol.push(card('Offered', offered));

  return (
    <Box tw='h-screen bg-gray-light'>
      <Box>
        <div tw='px-20 pt-12'>
          <h1 tw='text-5xl font-bold text-gray-800 mb-10'>{name}</h1>
        </div>
      </Box>
      <Grid
        container
        direction='row'
        justifyContent='space-around'
        alignItems='flex-start'
        rowSpacing={0}
        columnSpacing={0}
      >
        <Grid item xs={4}>
          {customColumn(narrowCol)}
        </Grid>
        <Grid item xs={8}>
          {customColumn(wideCol)}
        </Grid>
      </Grid>
    </Box>
  );
}

function customColumn(children: JSX.Element[]): JSX.Element {
  const gridItems = [];
  for (const child of children) {
    gridItems.push(<Grid item>{child}</Grid>);
  }
  return (
    <Grid container direction='column' alignItems='stretch'>
      {gridItems}
    </Grid>
  );
}

function card(title: string, content: string[]): JSX.Element {
  const cardContent = [];
  for (const text of content) {
    cardContent.push(
      <Typography tw='text-lg text-gray-600 padding-left[1rem]'>
        {text}
      </Typography>
    );
  }
  return (
    <div tw='padding[1rem]'>
      <Card tw=''>
        <Typography variant='h6' gutterBottom>
          {title}
        </Typography>
        {cardContent}
      </Card>
    </div>
  );
}

export default Course;
