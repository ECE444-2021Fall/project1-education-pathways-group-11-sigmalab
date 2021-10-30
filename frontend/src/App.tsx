import React from 'react';
import tw from 'twin.macro';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Courses, Home, ProfilesPage } from './pages';
import Navbar from './components/Navbar';
import ROUTES from './config/routes';

function App(): JSX.Element {
  return (
    <Router>
      <div tw='flex flex-row align-top'>
        <Navbar width={tw`w-16`} />
        <div tw='w-full'>
          <Switch>
            <Route path={ROUTES.profiles}>
              <ProfilesPage />
            </Route>
            {/* TODO: add dynamic path */}
            <Route path={ROUTES.courses}>
              <Courses />
            </Route>
            <Route path={ROUTES.home} exact>
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
