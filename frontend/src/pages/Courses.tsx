import React from 'react';
import tw from 'twin.macro';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function Courses(): JSX.Element {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        direction='row'
        justifyContent='space-around'
        alignItems='flex-start'
        rowSpacing={0}
        columnSpacing={0}>
        <Grid item xs={12}>
          <div tw='flex justify-center items-center h-full w-full'>
            <h1
              css={[
                tw`text-5xl text-black padding-bottom[2rem] padding-top[5rem]`,
              ]}>
              ECE444: Software Engineering
            </h1>
          </div>
        </Grid>
        <Grid item xs={8}>
          {card(
            'Description',
            'The software development process. Software requirements and specifications. Software design techniques. Techniques for developing large software systems; CASE tools and software development environments. Software testing, documentation and maintenance'
          )}
        </Grid>
        <Grid item xs={4}>
          {card('Division', 'Faculty of Applied Science & Engineering')}
        </Grid>
      </Grid>
      <Grid item xs={4}>
        {card(
          'Department',
          'Edward S. Rogers Sr. Dept. of Electrical & Computer Engin.'
        )}
      </Grid>
    </Box>
  );
}

function card(title: string, content: string): JSX.Element {
  return (
    <div tw='padding[2rem]'>
      <Card sx={{ minWidth: 275 }}>
        <CardContent tw='bg-blue-400 padding[4rem]'>
          <h1 tw='text-2xl font-bold padding[5px]'> {title}</h1>
          <h1 tw='text-2xl font-light'>{content}</h1>
        </CardContent>
      </Card>
    </div>
  );
}

export default Courses;
