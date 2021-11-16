import React, { Fragment, useState } from 'react';
import tw, { TwStyle } from 'twin.macro';
import Blogpost from './Blogpost';
import { Button, Card } from '../shared/';

function Whatsnew(): JSX.Element {
  return (
    <Fragment>
      <Card tw='h-full w-1/2 flex flex-col justify-center mb-1'>
        <h1 tw='flex-auto text-3xl text-blue-uoft'>Whats New</h1>
        <Blogpost
          title='Upcoming Features'
          body='Sigma Educate will have a bunch of new features coming up. Please stay tuned as we work towards making the ultimate course selection app.'
          link=''
          tw='flex-auto'
        />
        <Blogpost
          title='Just Launched'
          body='Sigma Educate has just launched the MVP. Please provide feedback if you encounter any issues.'
          link=''
          tw='flex-auto'
        />
      </Card>
    </Fragment>
  );
}

export default Whatsnew;
