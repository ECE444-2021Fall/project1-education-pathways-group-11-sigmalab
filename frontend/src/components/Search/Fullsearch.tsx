import React, { Fragment, useState } from 'react';
import tw from 'twin.macro';
import styled, { css } from 'styled-components';
import { Button, Card, Pill } from '../shared/';

interface SearchProps {
  defaultSearchTerm: string;
}

function Fullsearch({ defaultSearchTerm }: SearchProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('Search for courses...');
  const onLoad = () => setSearchTerm(defaultSearchTerm);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onClick = () => {
    if (searchTerm === defaultSearchTerm) {
      setSearchTerm('');
    }
  };

  const onBlur = () => {
    if (searchTerm === '') {
      setSearchTerm(defaultSearchTerm);
    }
  };

  return (
    <Fragment>
      <Card tw='w-2/3 flex-row justify-center h-auto mb-1 p-12'>
        <form action='' tw=''>
          <div tw='flex w-full'>
            <input
              type='text'
              name='search'
              tw='w-4/5 h-24 mb-5 text-gray-700 text-xl justify-center rounded-lg border-2 border-b-blue-uoft drop-shadow-none'
              value={searchTerm}
              onLoad={onLoad}
              onChange={onChange}
              onClick={onClick}
              onBlur={onBlur}
            ></input>
            <Button variant='primary' tw='w-1/5 ml-4 h-24 justify-center'>
              Search
            </Button>
          </div>

          <div tw='flex-row w-full'>
            <Pill tw='text-gray-800 border-black mr-5'> Optional Filters </Pill>
            <StyledDropdown name='years' id='years' tw='h-16'>
              <option value='Any'>Select Year</option>
              <option value='First Year'>First Year</option>
              <option value='Second Year'>Second Year</option>
              <option value='Third Year'>Third Year</option>
              <option value='Foruth Year'>Fourth Year</option>
            </StyledDropdown>
            <StyledDropdown name='Division' id='Division' tw='h-16'>
              <option value='Any'>Select Division</option>
            </StyledDropdown>
            <StyledDropdown name='Dept' id='Dept' tw='h-16'>
              <option value='Any'>Select Department</option>
            </StyledDropdown>
            <StyledDropdown name='Campus' id='Dept' tw='h-16'>
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
