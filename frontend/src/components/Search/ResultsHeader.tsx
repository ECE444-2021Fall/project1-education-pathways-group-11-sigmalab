import React from 'react';
import tw from 'twin.macro';
import { Card, Button } from '../shared';
import ResultCard from './Resultcard';

interface ResultsHeaderProps {
  setSearchState: React.Dispatch<React.SetStateAction<boolean>>;
}

function ResultsHeader({ setSearchState }: ResultsHeaderProps): JSX.Element {
  return (
    <>
      <Card tw='flex flex-row flex-wrap mb-2 px-2 py-4 transition-duration[0.50s]'>
        <ResultCard tw='mx-2 w-1/12 flex-auto flex-col bg-white min-height[fit-content] text-center p-2'>
          Name
        </ResultCard>
        <ResultCard tw='mx-2 w-1/12 flex-auto flex-col bg-white min-height[fit-content] text-center p-2'>
          Code
        </ResultCard>

        <ResultCard tw='mx-2 w-1/12 flex-auto flex-col bg-white min-height[fit-content] text-center p-2'>
          Division
        </ResultCard>
        <ResultCard tw='mx-2 flex-auto w-1/2 bg-white min-height[fit-content]'>
          Description
        </ResultCard>
        <Button
          tw='mx-2 h-auto flex-auto w-1/12 min-w-min px-4 py-4 rounded-3xl text-black'
          variant='light'
          onClick={() => {
            setSearchState(false);
          }}
        >
          Clear Results
        </Button>
      </Card>
    </>
  );
}

export default ResultsHeader;
