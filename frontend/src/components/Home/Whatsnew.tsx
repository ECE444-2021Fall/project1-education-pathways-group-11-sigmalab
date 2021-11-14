import React, { Fragment, useState } from 'react';
import tw, { TwStyle } from 'twin.macro';
import Blogpost from './Blogpost';
import { Button, Card } from '../shared/';

function Whatsnew(): JSX.Element {
  return (
    <Fragment>
      <Card tw='h-full w-1/2 flex flex-col justify-center mb-1'>
        <h1 tw='flex-auto text-3xl text-blue-uoft'>Whats New</h1>
        <Blogpost tw='flex-auto'></Blogpost>
        <Blogpost tw='flex-auto'></Blogpost>
        <Blogpost tw='flex-auto'></Blogpost>
      </Card>
    </Fragment>
  );
}

export default Whatsnew;
