import React, { useState, useEffect } from 'react';
import tw from 'twin.macro';
import { Alert, Box, Grid, Typography } from '@mui/material';
import { Card, Button } from '../shared';
import InfoCard from './InfoCard';
import RequirementsCard from './RequirementsCard';
import ROUTES from '../../config/routes';
import axios from 'axios';
import { useAppSelector } from '../../hooks';
import { TSchedule } from '../../store/userSlice';
import { find } from 'lodash';
import { useMutation, useQueries, useQueryClient } from 'react-query';

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
  const [currentProfile, profiles, username] = useAppSelector((state) => [
    state.user.currentProfile,
    state.user.profiles,
    state.user.username,
  ]);
  const schedule = find(profiles, { name: currentProfile })?.schedule;

  const [inProfile, setInProfile] = useState(false);
  const [alertOpen, setAlertOpen] = useState('');
  const [alertSeverity, setSeverity] = useState('info');
  const queryClient = useQueryClient();

  const wideCol = [
    card('Description', [course_description]),
    RequirementsCard(pre_requisites, corequisite, exclusion),
  ];
  const offered: string[] = [];
  const narrowCol = [InfoCard(code, division, department, campus)];
  if (term != 'NULL' && term != '') {
    const list = new String(term).split(' ');
    for (let i = 0; i < list.length - 1; i += 2) {
      offered.push(list[i].concat(' ', list[i + 1]));
    }
    narrowCol.push(card('Offered', offered));
  }
  const mutation = useMutation(
    () => {
      const param = {
        profile_name: currentProfile,
        username: username,
        course_code: code,
      };
      return axios.post(ROUTES.backend + '/appendCourse', param);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('profiles');
        setInProfile(true);
        setAlertOpen('The course was added to your default profile!');
        setSeverity('success');
      },
    }
  );

  const session = new String(term).split(' ')[1];
  const year = new String(term).split(' ')[0];

  // async function addToProfile() {}

  function isInProfile(schedule: TSchedule) {
    for (const year of schedule) {
      for (const session of year.sessions) {
        for (const course of session.courses) {
          if (course.name == code) return true;
        }
      }
    }
    return false;
  }

  return (
    <Box tw='h-screen bg-gray-light'>
      <Box>
        <div tw='pl-20 pr-5 pt-12'>
          <Grid
            container
            direction='row-reverse'
            justifyContent='flex-start'
            alignItems='flex-start'
            rowSpacing={0}
            columnSpacing={0}
          >
            <Grid item xs={1.5}>
              <Button
                tw='padding[1rem] h-auto w-auto'
                onClick={() => mutation.mutate()}
                disabled={currentProfile == ''}
              >
                {inProfile ? 'In profile' : 'Add to profile'}
              </Button>
            </Grid>
            <Grid item xs={10.5}>
              <h1 tw='text-5xl font-bold text-gray-800 mb-10'>{name}</h1>
            </Grid>
          </Grid>
        </div>
      </Box>
      {alertOpen != '' ? (
        <Alert
          tw='mx-6'
          severity={alertSeverity == 'success' ? 'success' : 'error'}
          onClose={() => setAlertOpen('')}
        >
          {alertOpen}
        </Alert>
      ) : (
        <></>
      )}
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
