import React, { Fragment, useState } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { Button, Card, Pill } from '../shared/';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import SearchQuery, { CourseResults } from '../../lib/searchQuery';
import Department from './Department';

interface SearchProps {
  setSearchState: React.Dispatch<React.SetStateAction<boolean>>;
  setResults: React.Dispatch<React.SetStateAction<CourseResults[] | null>>;
}

interface FormValues {
  searchQuery: string;
  yearFilter: string;
  divisionFilter: string;
  departmentFilter: string;
  campusFilter: string;
}

const schema: yup.SchemaOf<FormValues> = yup
  .object()
  .shape({
    searchQuery: yup.string().min(3).defined(),
    yearFilter: yup.string(),
    divisionFilter: yup.string(),
    departmentFilter: yup.string(),
    campusFilter: yup.string(),
  })
  .defined();

function Fullsearch({
  setSearchState,
  // eslint-disable-next-line
  setResults,
}: SearchProps): JSX.Element {
  const { handleSubmit, register, control } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const results = await SearchQuery(data['searchQuery'], {
      year: data['yearFilter'],
      division: data['divisionFilter'],
      department: data['departmentFilter'],
      campus: data['campusFilter'],
    });
    if (results != null && results != undefined) {
      setResults(results.results);
    } else {
      setResults(null);
    }
    setSearchState(true);
  });

  const [showFilters, setShowFilters] = useState(false);

  return (
    <Fragment>
      <Card tw='w-5/6 flex-row justify-center h-auto mb-2 px-12 pt-12 pb-10'>
        <form action='' tw='' onSubmit={onSubmit}>
          <div tw='flex w-full'>
            <input
              type='text'
              tw='w-11/12 h-20 mb-5 text-gray-700 text-xl justify-center rounded-lg border-2 border-b-blue-uoft drop-shadow-none p-2'
              placeholder='Search for courses...'
              {...register('searchQuery')}
            ></input>
            <Button
              variant='primary'
              type='submit'
              tw='w-24 ml-4 h-20 justify-center'
            >
              Search
            </Button>
          </div>

          <div tw='flex-row w-full'>
            <Pill
              tw='text-gray-800 bg-gray-300 shadow-xl text-lg mr-5'
              onClick={() => setShowFilters(!showFilters)}
            >
              {' '}
              Optional Filters{' '}
            </Pill>
            {showFilters ? (
              <>
                <Controller
                  name='yearFilter'
                  control={control}
                  render={({ field }) => (
                    <StyledDropdown id='years' tw='h-16 mb-2 w-32' {...field}>
                      <option value=''>Select Year</option>
                      <option value='1'>First Year</option>
                      <option value='2'>Second Year</option>
                      <option value='3'>Third Year</option>
                      <option value='4'>Fourth Year</option>
                    </StyledDropdown>
                  )}
                />
                <Controller
                  name='divisionFilter'
                  control={control}
                  render={({ field }) => (
                    <StyledDropdown
                      id='Division'
                      tw='h-16 mb-2 w-36'
                      {...field}
                    >
                      <option value=''>Select Division</option>
                      <option value='Faculty of Applied Science & Engineering'>
                        Faculty of Applied Science & Engineering
                      </option>
                      <option value='Faculty of Arts and Science'>
                        Faculty of Arts and Science
                      </option>
                      <option value='University of Toronto Mississauga'>
                        University of Toronto Mississauga
                      </option>
                      <option value='University of Toronto Scarborough'>
                        University of Toronto Scarborough
                      </option>
                    </StyledDropdown>
                  )}
                />
                <Controller
                  name='departmentFilter'
                  control={control}
                  render={({ field }) => (
                    <StyledDropdown id='Dept' tw='h-16 mb-2 w-44' {...field}>
                      <option value=''>Select Department</option>
                      <Department></Department>
                    </StyledDropdown>
                  )}
                />
                <Controller
                  name='campusFilter'
                  control={control}
                  render={({ field }) => (
                    <StyledDropdown id='Campus' tw='h-16 mb-2 w-36' {...field}>
                      <option value=''>Select Campus</option>
                      <option value='Mississauga'>Mississauga</option>
                      <option value='Scarborough'>Scarborough</option>
                      <option value='St. George'>St. George</option>
                    </StyledDropdown>
                  )}
                />
              </>
            ) : (
              <></>
            )}
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
