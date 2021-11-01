import React from 'react';
import tw from 'twin.macro';
import { Box, Grid, Typography } from '@mui/material';
import { Button, Card } from '../components/shared';

function Courses(): JSX.Element {
  const wideCol = [
    card('Description', [
      'The software development process. Software requirements and specifications. Software design techniques. Techniques for developing large software systems; CASE tools and software development environments. Software testing, documentation and maintenance',
    ]),
    card('Offered', ['Fall 2021', 'Winter 2022', 'Summer 2022']),
  ];
  const narrowCol = [
    card('Division', ['Faculty of Applied Science & Engineering']),
    card('Department', [
      'Edward S. Rogers Sr. Dept. of Electrical & Computer Engin.',
    ]),
    card('Prerequisites', ['ECE345', 'ECE297']),
  ];
  return (
    <Box tw='h-screen bg-gray-light'>
      <Box>
        <div tw='px-20 pt-12'>
          <h1 tw='text-5xl font-bold text-gray-800 mb-10'>
            Software Engineering
          </h1>
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

export default Courses;
