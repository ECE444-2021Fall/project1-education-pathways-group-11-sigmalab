import React, { Fragment } from 'react';
import tw from 'twin.macro';
import { Card, Button } from '../shared';
import ResultCard from './Resultcard';

interface ResultsheaderProps {
  setSearchState: React.Dispatch<React.SetStateAction<boolean>>;
}

function Resultsheader({ setSearchState }: ResultsheaderProps): JSX.Element {
  return (
    <Fragment>
      <Card tw='w-2/3 my-4 flex flex-row'>
        <ResultCard tw='mx-2 w-20 my-auto h-auto text-center'>Name</ResultCard>
        <ResultCard tw='mx-2 w-28 my-auto h-auto text-center'>Code</ResultCard>
        <ResultCard tw='mx-2 w-16 my-auto h-auto text-center'>Year</ResultCard>
        <ResultCard tw='mx-2 w-28 my-auto h-auto text-center'>
          Division
        </ResultCard>
        <ResultCard tw='mx-2 w-28 my-auto h-auto text-center'>
          Department
        </ResultCard>
        <ResultCard tw='mx-2 w-auto h-auto'>Description</ResultCard>
        <Button
          tw='mx-2 h-24 my-auto w-auto px-4 rounded-3xl'
          onClick={() => {
            setSearchState(false);
          }}
        >
          Clear Results
        </Button>
      </Card>
    </Fragment>
  );
}

export default Resultsheader;
