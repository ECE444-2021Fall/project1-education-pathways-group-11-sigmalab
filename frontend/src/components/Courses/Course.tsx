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
  course_description: string;
  last_updated: string;
  term: string;
  pre_requisites?: string;
  corequisite?: string;
  exclusion?: string;
}
function Course({
  code,
  name,
  division,
  department,
  campus,
  course_description,
  last_updated,
  term,
  pre_requisites,
  corequisite,
  exclusion,
}: CourseProps): JSX.Element {
  const wideCol = [
    card('Description', [course_description]),
    RequirementsCard(pre_requisites, corequisite, exclusion),
  ];
  const narrowCol = [InfoCard(code, division, department, campus)];
  if (term != 'NULL' && term != '') {
    const list = new String(term).split(' ');
    const offered: string[] = [];
    for (let i = 0; i < list.length - 1; i += 2) {
      offered.push(list[i].concat(' ', list[i + 1]));
    }
    narrowCol.push(card('Offered', offered));
  }

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
      <p tw='position[absolute] bottom-1 ml-2 text-gray-300'>
        Last updated: {last_updated}
      </p>
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
      <Typography key={text} tw='text-lg text-gray-600 padding-left[1rem]'>
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
