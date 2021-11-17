import React from 'react';
import tw from 'twin.macro';
import { Button, Card } from '../shared/';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import SearchQuery, { CourseResults } from '../../lib/searchQuery';

interface QuicksearchProps {
  setSearchState: React.Dispatch<React.SetStateAction<boolean>>;
  setResults: React.Dispatch<React.SetStateAction<CourseResults[] | null>>;
}

interface QuickFormValues {
  searchQuery: string;
}

const schema: yup.SchemaOf<QuickFormValues> = yup
  .object()
  .shape({
    searchQuery: yup.string().min(3).defined(),
  })
  .defined();

function Quicksearch({
  setSearchState,
  setResults,
}: QuicksearchProps): JSX.Element {
  const { handleSubmit, register } = useForm<QuickFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const results = await SearchQuery(data['searchQuery'], '');
    if (results != null && results != undefined) {
      setResults(results.results);
    } else {
      setResults(null);
    }
    setSearchState(true);
  });

  return (
    <>
      <Card tw='flex flex-row justify-center h-36 mb-1'>
        <form tw='w-full' action='' onSubmit={onSubmit}>
          <div tw='flex min-w-full'>
            <input
              type='text'
              tw='w-11/12 h-24 text-gray-700 text-xl justify-center rounded-lg border-b-blue-uoft p-2'
              placeholder='Search for courses...'
              {...register('searchQuery')}
            />
            <Button
              variant='primary'
              type='submit'
              tw=' h-auto ml-4 w-1/12 justify-center'
            >
              Search
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
}

export default Quicksearch;
