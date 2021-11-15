import React from 'react';
import tw from 'twin.macro';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Courses, Home, Login, ProfilesPage } from './pages';
import Navbar from './components/Navbar';
import ROUTES from './config/routes';
import PrivateRoute from './components/PrivateRoute';
function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path={[ROUTES.login, ROUTES.signup]}>
          <Login />
        </Route>
        <Route>
          <div tw='flex flex-row align-top'>
            <Navbar width={tw`w-16`} />
            <div tw='w-full'>
              <Switch>
                <PrivateRoute path={ROUTES.profiles}>
                  <ProfilesPage />
                </PrivateRoute>
                {/* TODO: add dynamic path */}
                <PrivateRoute path={ROUTES.courses}>
                  <Courses />
                </PrivateRoute>
                <PrivateRoute path={ROUTES.home}>
                  <Home />
                </PrivateRoute>
              </Switch>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
