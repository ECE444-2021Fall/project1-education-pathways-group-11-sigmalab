import React from 'react';
import tw from 'twin.macro';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

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
      <Grid
        container
        direction='row'
        justifyContent='space-around'
        alignItems='flex-start'
        rowSpacing={0}
        columnSpacing={0}
      >
        <Grid item xs={12}>
          <div tw='flex justify-center items-center h-full w-full'>
            <Typography gutterBottom variant='h2' mt={4} color='black'>
              ECE444: Software Engineering
            </Typography>
          </div>
        </Grid>
        <Grid item xs={8}>
          {customColumn(wideCol)}
        </Grid>
        <Grid item xs={4}>
          {customColumn(narrowCol)}
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
      <Typography variant='body1' tw='padding-left[1rem]'>
        {text}
      </Typography>
    );
  }
  return (
    <div tw='padding[1rem]'>
      <Card sx={{ minWidth: 275 }} raised={true}>
        <CardContent tw='bg-blue-300'>
          <Typography variant='h6' gutterBottom>
            {title}
          </Typography>
          {cardContent}
        </CardContent>
      </Card>
    </div>
  );
}

export default Courses;
