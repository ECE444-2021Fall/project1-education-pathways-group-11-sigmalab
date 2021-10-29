import React from 'react';
import tw from 'twin.macro';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

function Courses(): JSX.Element {
  const wideCol = [
    card(
      'Description',
      'The software development process. Software requirements and specifications. Software design techniques. Techniques for developing large software systems; CASE tools and software development environments. Software testing, documentation and maintenance'
    ),
    card('Offered', 'Fall 2021 Winter 2022'),
  ];
  const narrowCol = [
    card('Division', 'Faculty of Applied Science & Engineering'),
    card(
      'Department',
      'Edward S. Rogers Sr. Dept. of Electrical & Computer Engin.'
    ),
  ];
  return (
    <Box height="100vh" bgcolor="primary.main">
      <Grid
        container
        direction='row'
        justifyContent='space-around'
        alignItems='flex-start'
        rowSpacing={0}
        columnSpacing={0}>
        <Grid item xs={12}>
          <div tw='flex justify-center items-center h-full w-full'>
            <Typography gutterBottom variant="h2" mt={4} color="white">
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

function card(title: string, content: string): JSX.Element {
  return (
    <div tw='padding[1rem]'>
      <Card sx={{ minWidth: 275 }} raised={true}>
        <CardContent tw="bg-blue-200">
          <Typography variant='h6' gutterBottom tw="padding-left[1rem]">{title}</Typography>
          <Typography variant='body2' gutterBottom tw="padding-left[2rem]">{content}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Courses;
