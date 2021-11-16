import React from 'react';
import tw from 'twin.macro';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Courses, Home, Login, ProfilesPage, Search } from './pages';
import Navbar from './components/Navbar';
import ROUTES from './config/routes';
import PrivateRoute from './components/PrivateRoute';

function App(): JSX.Element {
  return (
    <Router>
      <div tw='flex flex-row align-top'>
        <Navbar width={tw`w-16`} />
        <div tw='w-full'>
          <Switch>
            <Route path={[ROUTES.login, ROUTES.signup]}>
              <Login />
            </Route>
            <PrivateRoute path={ROUTES.profiles}>
              <ProfilesPage />
            </PrivateRoute>
            {/* TODO: add dynamic path */}
            <Route path={ROUTES.search}>
              <Search />
            </Route>
            <PrivateRoute path={ROUTES.courses}>
              <Courses />
            </PrivateRoute>
            <PrivateRoute path={ROUTES.home}>
              <Home />
            </PrivateRoute>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
