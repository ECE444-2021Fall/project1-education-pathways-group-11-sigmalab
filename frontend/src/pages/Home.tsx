import React, { Fragment, useState } from 'react';
import tw from 'twin.macro';
import QuickSearch from '../components/Home/QuickSearch';
import TopCourses from '../components/Home/TopCourses';
import QuickProfile from '../components/Home/QuickProfile';
import { CourseResults } from '../lib/searchQuery';
import Results from '../components/Search/Results';
import ResultsHeader from '../components/Search/ResultsHeader';
import NoResultsHeader from '../components/Search/NoResults';

const StyledSection = tw.section`w-1/2`;

function Home(): JSX.Element {
  const [searchState, setSearchState] = useState(false);
  const [results, setResults] = useState<CourseResults[] | null>(null);
  const results_length = results ? results.length : -1;
  return (
    <Fragment>
      <h1 tw='px-20 pt-12 text-5xl justify-center font-bold text-gray-800 mb-10'>
        Sigma Educate
      </h1>
      <div tw='w-full px-20'>
        <div tw='mb-5'>
          <QuickSearch
            setSearchState={setSearchState}
            setResults={setResults}
            tw='w-full'
          />
        </div>
        <div tw='mb-10'>
          {searchState && results_length < 1 && (
            <NoResultsHeader setSearchState={setSearchState} />
          )}

          {searchState && results_length > 0 && (
            <ResultsHeader setSearchState={setSearchState} />
          )}

          {searchState &&
            results_length > 0 &&
            results?.slice(0, 2).map((result, index) => (
              <>
                <Results
                  key={index}
                  tw='position[absolute] flex mb-2 w-full'
                  courseName={result.name}
                  courseCode={result.code}
                  courseDivision={result.division}
                  courseDescription={
                    result.course_description.substring(0, 300) + '...'
                  }
                />
              </>
            ))}
        </div>
        <div tw='flex flex-row'>
          <QuickProfile tw='flex-1 h-full' />
          <TopCourses tw='flex-1 h-screen'></TopCourses>
        </div>

        {/* <h1 css={[tw`text-5xl text-white`]}>Hello World</h1> */}
      </div>
    </Fragment>
  );
}

export default Home;
