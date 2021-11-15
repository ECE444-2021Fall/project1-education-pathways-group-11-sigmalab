import React, { useState } from 'react';
import tw from 'twin.macro';
import Fullsearch from '../components/Search/Fullsearch';
import Results from '../components/Search/Results';
import Resultsheader from '../components/Search/Resultsheader';
import axios from 'axios';
import { CourseResults } from '../lib/searchQuery';
import { result } from 'lodash';

function Search(): JSX.Element {
  const [searchState, setSearchState] = useState(false);
  const [results, setResults] = useState<CourseResults[] | null>(null);

  return (
    <div tw='flex flex-col justify-center items-center h-full w-full '>
      <Fullsearch
        defaultSearchTerm='Search for courses...'
        setSearchState={setSearchState}
        setResults={setResults}
        tw='position[absolute] flex'
      />

      {searchState && <Resultsheader />}

      {searchState &&
        results?.map((result, index) => (
          <>
            <Results
              key={index}
              tw='position[absolute] flex mb-2'
              courseName={result.name}
              courseCode={result.code}
              courseYear={result.code}
              courseDivision={result.division}
              courseDepartment={result.department}
              courseDescription={
                result.course_description.substring(0, 300) + '...'
              }
            />
          </>
        ))}
    </div>
  );
}

export default Search;
