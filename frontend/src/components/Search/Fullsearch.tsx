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
  const onChange = (e: any) => {
    setSearchTerm(e.target.value);
  };
  const onClick = () => {
    if (searchTerm === defaultSearchTerm) {
      setSearchTerm('');
    }
  };

  return (
    <Fragment>
      <Card tw='w-2/3 flex flex-row justify-center h-52 mb-1'>
        <form action='' tw=''>
          <input
            type='text'
            name='search'
            tw='w-full h-1/2 mb-5 text-gray-700 rounded-lg border-2 border-b-blue-uoft border-dotted drop-shadow-none'
            value={searchTerm}
            onLoad={onLoad}
            onChange={onChange}
            onClick={onClick}
          ></input>
          <Pill> Filters </Pill>
          <StyledDropdown name='years' id='years' tw='h-1/3'>
            <option value='Any'>Select Year</option>
            <option value='First Year'>First Year</option>
            <option value='Second Year'>Second Year</option>
            <option value='Third Year'>Third Year</option>
            <option value='Foruth Year'>Fourth Year</option>
          </StyledDropdown>
          <StyledDropdown name='Division' id='Division' tw='h-1/3'>
            <option value='Any'>Select Division</option>
          </StyledDropdown>
          <StyledDropdown name='Dept' id='Dept' tw='h-1/3'>
            <option value='Any'>Select Department</option>
          </StyledDropdown>
          <StyledDropdown name='Campus' id='Dept' tw='h-1/3'>
            <option value='Any'>Select Campus</option>
          </StyledDropdown>
        </form>
        <Button variant='primary' tw='flex-auto h-1/2 justify-center ml-1'>
          Search
        </Button>
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
