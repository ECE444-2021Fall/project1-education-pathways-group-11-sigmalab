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
      <Card tw='flex flex-row flex-wrap mb-2 px-2 py-4 transition-duration[0.50s]'>
        <ResultCard tw='mx-2 w-1/12 flex-auto flex-col bg-gray-300 min-height[fit-content] text-center p-2'>
          Name
        </ResultCard>
        <ResultCard tw='mx-2 w-1/12 flex-auto flex-col bg-gray-300 min-height[fit-content] text-center p-2'>
          Code
        </ResultCard>

        <ResultCard tw='mx-2 w-1/12 flex-auto flex-col bg-gray-300 min-height[fit-content] text-center p-2'>
          Division
        </ResultCard>
        <ResultCard tw='mx-2 flex-auto w-1/2 bg-gray-300 min-height[fit-content]'>
          Description
        </ResultCard>
        <Button
          tw='mx-2 h-auto flex-auto w-1/12 min-w-min px-4 py-4 rounded-3xl'
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
