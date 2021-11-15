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
      <Card tw='mb-2 flex flex-row mb-2 px-2 py-4'>
        <ResultCard tw='mx-2 w-1/12 flex-auto min-width[fit-content] my-auto h-auto text-center'>
          Name
        </ResultCard>
        <ResultCard tw='mx-2 w-1/12 flex-auto min-width[fit-content] my-auto h-auto text-center'>
          Code
        </ResultCard>

        <ResultCard tw='mx-2 w-1/12 flex-auto min-width[fit-content] my-auto h-auto text-center'>
          Division
        </ResultCard>
        <ResultCard tw='mx-2 w-1/12 flex-auto min-width[fit-content] my-auto h-auto text-center'>
          Department
        </ResultCard>
        <ResultCard tw='mx-2 w-1/2 my-auto flex-auto h-auto'>
          Description
        </ResultCard>
        <Button
          tw='mx-2 w-1/12 py-2 flex-auto my-auto px-4 rounded-3xl'
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
