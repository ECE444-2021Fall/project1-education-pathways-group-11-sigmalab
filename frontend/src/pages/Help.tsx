import { Card } from '@mui/material';
import React, { useState } from 'react';
import tw from 'twin.macro';

function Help(): JSX.Element {
  const [showCardHow, setShowCardHow] = useState(false);
  const [showCardFeatures, setCardFeatures] = useState(false);
  const [showCardUpcoming, setShowCardUpcoming] = useState(false);
  const [showMenuHelp, setShowMenuHelp] = useState(false);

  return (
    <>
      <h1 tw='px-20 pt-12 text-5xl justify-center font-bold text-gray-800 mb-10'>
        About Us and Help
      </h1>
      <div tw='flex flex-col'>
        <Card
          tw='h-full w-11/12 flex flex-col justify-center m-auto mb-6 cursor-pointer'
          onClick={() => setShowCardHow(!showCardHow)}
        >
          <h1 tw='px-20 pt-12 text-xl justify-center font-bold text-gray-800 mb-10'>
            {!showCardHow && <>&#9654;</>}
            {showCardHow && <>&#9660;</>} About Sigma Educate
          </h1>
          {showCardHow && (
            <p tw='px-20 pb-20'>
              Sigma Educate is a simple course planning tool for students at U
              of T. The tool is made by U of T students enrolled in ECE444H1.
              The app is currently in beta but the core features are available.
            </p>
          )}
        </Card>
        <Card
          tw='h-full w-11/12 flex flex-col justify-center m-auto mb-6 cursor-pointer'
          onClick={() => setCardFeatures(!showCardFeatures)}
        >
          <h1 tw='px-20 pt-12 text-xl justify-center font-bold text-gray-800 mb-10'>
            {!showCardFeatures && <>&#9654;</>}
            {showCardFeatures && <>&#9660;</>} Current Features
          </h1>
          {showCardFeatures && (
            <p tw='px-20 pb-20'>
              Users can currently search through all courses offered at U of T
              and add them to their account and save it for later. <br /> <br />
              Users can add courses to their currently selected profile by
              finding a course (from the search or home page) and then press
              more information and press add to profile.
              <br /> <br />
              Users can create multiple profiles with different courses saved.
              New profiles can be created from the profiles page (third icon on
              menu bar). <br />
              <br />
              Users can reschedule courses on the profiles page by dragging them
              around between time slots.
            </p>
          )}
        </Card>
        <Card
          tw='h-full w-11/12 flex flex-col justify-center m-auto mb-6 cursor-pointer'
          onClick={() => setShowCardUpcoming(!showCardUpcoming)}
        >
          <h1 tw='px-20 pt-12 text-xl justify-center font-bold text-gray-800 mb-10'>
            {!showCardUpcoming && <>&#9654;</>}
            {showCardUpcoming && <>&#9660;</>} Upcoming Features
          </h1>
          {showCardUpcoming && (
            <p tw='px-20 pb-20'>
              There are many features coming to Sigma Educate in the future.
              <br /> <br />
              Future releases of Sigma Educate will add additional features to
              the course pages. Users will be able to view pre-requesites
              through a tree view. Users will also be able to remove courses
              from a profile directly from the course page. A rating system and
              discussion board will also be added.
              <br /> <br />
              In future releases, Sigma Educate will display RateMyProf
              information on the course page based on whichever professor is
              teaching the course. <br />
              <br />
              Future releases will expand upon users and add a user dashboard
              where user information can be displayed and managed.
              <br /> <br />
              Sigma Educate will also add a more advanced scheduler that will
              allow users to schedule courses based on time automatically. So
              you can create schedules and plan them. These schedules can also
              be shared.
            </p>
          )}
        </Card>
        <Card
          tw='h-full w-11/12 flex flex-col justify-center m-auto mb-6 cursor-pointer'
          onClick={() => setShowMenuHelp(!showMenuHelp)}
        >
          <h1 tw='px-20 pt-12 text-xl justify-center font-bold text-gray-800 mb-10'>
            {!showMenuHelp && <>&#9654;</>}
            {showMenuHelp && <>&#9660;</>} The Menu Bar
          </h1>
          {showMenuHelp && (
            <p tw='px-20 pb-20'>
              The menu bar on the left hand side will help you navigate the
              Sigma Educate website.
              <li>The Sigma button is used to navigate to the home page. </li>
              <li>
                The search button is used to navigate to the course search page.
              </li>
              <li>
                The recipe icon is used button is used to navigate to the
                schedules and profile page.
              </li>
              <li>The exit button is used to log out of the website.</li>
            </p>
          )}
        </Card>
      </div>
    </>
  );
}

export default Help;
