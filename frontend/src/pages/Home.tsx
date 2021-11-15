import React, { Fragment, useState } from 'react';
import tw from 'twin.macro';
import Quicksearch from '../components/Home/Quicksearch';
import Whatsnew from '../components/Home/Whatsnew';
import Quickprofile from '../components/Home/Quickprofile';
import { CourseResults } from '../lib/searchQuery';
import Results from '../components/Search/Results';

const StyledSection = tw.section`w-1/2`;

function Home(): JSX.Element {
  const [searchState, setSearchState] = useState(false);
  const [results, setResults] = useState<CourseResults[] | null>(null);
  return (
    <Fragment>
      <h1 tw='px-20 pt-12 text-5xl justify-center font-bold text-gray-800 mb-10'>
        Sigma Educate
      </h1>
      <div tw='h-full w-full px-20'>
        <div tw='mb-10'>
          <Quicksearch
            setSearchState={setSearchState}
            setResults={setResults}
            tw='w-full'
          />
        </div>
        {searchState &&
          results?.slice(0, 3).map((result, index) => (
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
        <div tw='flex flex-row'>
          <Quickprofile tw='flex-1 h-full' />
          <Whatsnew tw='flex-1 h-screen'></Whatsnew>
        </div>

        {/* <h1 css={[tw`text-5xl text-white`]}>Hello World</h1> */}
      </div>
    </Fragment>
  );
}

export default Home;
