import React, { Fragment } from 'react';
import tw from 'twin.macro';
import ResultCard from './Resultcard';
import { Card, Button } from '../shared';
import { useHistory } from 'react-router';

interface ResultsProps {
  courseName: string;
  courseCode: string;
  courseDivision: string;
  courseDescription: string;
}

function Results({
  courseName,
  courseCode,
  courseDivision,
  courseDescription,
}: ResultsProps): JSX.Element {
  const history = useHistory();

  return (
    <Fragment>
      <Card tw='flex flex-row flex-wrap mb-2 px-2 py-4 bg-gray-100 transition-duration[0.50s]'>
        <ResultCard tw='mx-2 w-1/12 flex-auto flex-col min-height[fit-content] text-center p-2'>
          {courseName}
        </ResultCard>
        <ResultCard tw='mx-2 w-1/12 flex-auto min-height[fit-content] text-center p-2'>
          {courseCode}
        </ResultCard>
        <ResultCard tw='mx-2 w-1/12 flex-auto min-height[fit-content] p-2'>
          {courseDivision}
        </ResultCard>
        <ResultCard tw='mx-2 flex-auto w-1/2 min-height[fit-content]'>
          {courseDescription}
        </ResultCard>
        <Button
          tw='mx-2 h-20 my-auto flex-auto w-1/12 min-w-min px-4 py-4 rounded-3xl'
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
