import React, { useState } from 'react';
import tw from 'twin.macro';
import Fullsearch from '../components/Search/Fullsearch';
import Results from '../components/Search/Results';
import Noresults from '../components/Search/Noresults';
import Resultsheader from '../components/Search/Resultsheader';
import axios from 'axios';
import { CourseResults } from '../lib/searchQuery';

function Search(): JSX.Element {
  const [searchState, setSearchState] = useState(false);
  const [results, setResults] = useState<CourseResults[] | null>(null);
  const results_length = results ? results.length : -1;
  return (
    <div tw='flex flex-col justify-center items-center min-h-screen w-full '>
      <Fullsearch
        setSearchState={setSearchState}
        setResults={setResults}
        tw='position[absolute] flex'
      />
      <div tw='w-5/6 mt-2'>
        {searchState && results_length < 1 && (
          <Noresults setSearchState={setSearchState} />
        )}
        {searchState && results_length > 0 && (
          <Resultsheader setSearchState={setSearchState} />
        )}{' '}
        {searchState &&
          results_length > 0 &&
          results?.map((result, index) => (
            <>
              <Results
                key={index}
                tw='position[absolute] flex mb-2'
                courseName={result.name}
                courseCode={result.code}
                courseDivision={result.division}
                courseDepartment={result.department}
                courseDescription={
                  result.course_description.substring(0, 300) + '...'
                }
              />
            </>
          ))}
      </div>
    </div>
  );
}

export default Search;
