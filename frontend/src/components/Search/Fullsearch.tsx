import React, { Fragment, useState } from 'react';
import tw from 'twin.macro';
import styled, { css } from 'styled-components';
import { Button, Card, Pill } from '../shared/';
import ROUTES from '../../config/routes';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import SearchQuery, { CourseResults } from '../../lib/searchQuery';

interface SearchProps {
  defaultSearchTerm: string;
  setSearchState: React.Dispatch<React.SetStateAction<boolean>>;
  setResults: React.Dispatch<React.SetStateAction<CourseResults[] | null>>;
}

interface FormValues {
  searchQuery: string;
  yearFilter: string;
}

const schema: yup.SchemaOf<FormValues> = yup
  .object()
  .shape({
    searchQuery: yup.string().min(3).defined(),
    yearFilter: yup.string(),
  })
  .defined();

function Fullsearch({
  defaultSearchTerm,
  setSearchState,
  // eslint-disable-next-line
  setResults,
}: SearchProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('Search for courses...');
  const { handleSubmit, register, control } = useForm<FormValues>({
    resolver: yupResolver(schema),
    //defaultValues: { searchQuery: '' },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const results = await SearchQuery(data['searchQuery'], {
      year: data['yearFilter'],
    });
    console.log(results);
    if (results != null && results != undefined) {
      setResults(results.results);
    } else {
      setResults(null);
    }
    setSearchState(true);
  });

  return (
    <Fragment>
      <Card tw='w-2/3 flex-row justify-center h-auto mb-1 px-12 pt-12 pb-10'>
        <form action='' tw='' onSubmit={onSubmit}>
          <div tw='flex w-full'>
            <input
              type='text'
              tw='w-4/5 h-24 mb-5 text-gray-700 text-xl justify-center rounded-lg border-2 border-b-blue-uoft drop-shadow-none'
              placeholder='Search for courses...'
              {...register('searchQuery')}
            ></input>
            <Button
              variant='primary'
              type='submit'
              tw='w-1/5 ml-4 h-24 justify-center'
            >
              Search
            </Button>
          </div>

          <div tw='flex-row w-full'>
            <Pill tw='text-gray-800 border-black mr-5'> Optional Filters </Pill>
            <Controller
              name='yearFilter'
              control={control}
              render={({ field }) => (
                <StyledDropdown id='years' tw='h-16 mb-2' {...field}>
                  <option value=''>Select Year</option>
                  <option value='1'>First Year</option>
                  <option value='2'>Second Year</option>
                  <option value='3'>Third Year</option>
                  <option value='4'>Fourth Year</option>
                </StyledDropdown>
              )}
            />

            <StyledDropdown name='Division' id='Division' tw='h-16 mb-2'>
              <option value='Any'>Select Division</option>
            </StyledDropdown>
            <StyledDropdown name='Dept' id='Dept' tw='h-16 mb-2'>
              <option value='Any'>Select Department</option>
            </StyledDropdown>
            <StyledDropdown name='Campus' id='Dept' tw='h-16 mb-2'>
              <option value='Any'>Select Campus</option>
            </StyledDropdown>
          </div>
        </form>
      </Card>
    </Fragment>
  );
}

const StyledDropdown = styled.select`
  background-color: rgb(0, 42, 92);
  -webklit-appearance: none;
  -moz-appearnce: none;
  appearance: none;
  color: white;
  padding: 16px;
  border: none;
  cursor: pointer;
  margin-right: 20px;
`;

export default Fullsearch;
