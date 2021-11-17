import React, { Fragment } from 'react';
import tw from 'twin.macro';
import { Card } from '../shared';

interface NoResultsProps {
  setSearchState: React.Dispatch<React.SetStateAction<boolean>>;
}

function NoResultsHeader({ setSearchState }: NoResultsProps): JSX.Element {
  return (
    <Fragment>
      <Card tw='mb-2 flex flex-row px-2'>
        <div
          tw='text-center mx-auto p-2 text-xl w-11/12 hover:cursor-pointer hover:underline'
          onClick={() => {
            setSearchState(false);
          }}
        >
          No Results, Click to clear.
        </div>
      </Card>
    </Fragment>
  );
}

export default NoResultsHeader;
