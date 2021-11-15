import React, { Fragment } from 'react';
import tw from 'twin.macro';
import ResultCard from './Resultcard';
import { Card, Button } from '../shared';
import { useHistory } from 'react-router';

interface ResultsProps {
  courseName: string;
  courseCode: string;
  courseYear: string;
  courseDivision: string;
  courseDepartment: string;
  courseDescription: string;
}

function Results({
  courseName,
  courseCode,
  courseYear,
  courseDivision,
  courseDepartment,
  courseDescription,
}: ResultsProps): JSX.Element {
  const history = useHistory();

  return (
    <Fragment>
      <Card tw='w-2/3 flex flex-row mb-2'>
        <ResultCard tw='mx-2 w-20 my-auto h-auto text-center'>
          {courseName}
        </ResultCard>
        <ResultCard tw='mx-2 w-28 my-auto h-auto text-center'>
          {courseCode}
        </ResultCard>
        <ResultCard tw='mx-2 w-16 my-auto h-auto'>{courseYear}</ResultCard>
        <ResultCard tw='mx-2 w-28 my-auto h-auto'>{courseDivision}</ResultCard>
        <ResultCard tw='mx-2 w-auto my-auto h-auto'>
          {courseDepartment}
        </ResultCard>
        <ResultCard tw='mx-2 w-auto h-auto'>{courseDescription}</ResultCard>
        <Button
          tw='mx-2 h-24 my-auto w-auto px-4 rounded-3xl'
          onClick={() => {
            history.push('/courses/' + courseCode);
          }}
        >
          More Information
        </Button>
      </Card>
    </Fragment>
  );
}

export default Results;
