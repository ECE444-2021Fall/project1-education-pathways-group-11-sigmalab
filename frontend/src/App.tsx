import React, { useEffect } from 'react';
import tw from 'twin.macro';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Courses, Home, Login, ProfilesPage, Search, Help } from './pages';
import Navbar from './components/Navbar';
import ROUTES from './config/routes';
import PrivateRoute from './components/PrivateRoute';
import DataLoader from './components/DataLoader';
import { useDispatch } from 'react-redux';
import { logUser } from './store/userSlice';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function App(): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    const username = cookies.get('username') as string;
    const password = cookies.get('password') as string;
    if (username?.length != 0 && password?.length != 0)
      dispatch(logUser({ username, password }));
  }, [dispatch]);
  return (
    <Router>
      <Switch>
        <Route path={[ROUTES.login, ROUTES.signup]}>
          <Login />
        </Route>
        <Route>
          <DataLoader />
          <div tw='flex flex-row align-top'>
            <Navbar width={tw`w-16`} />
            <div tw='w-16' />
            <div tw='w-full '>
              <Switch>
                <Route path={ROUTES.search} exact>
                  <Search />
                </Route>
                <Route path={ROUTES.help} exact>
                  <Help />
                </Route>
                <Route
                  path={ROUTES.courses}
                  render={(props) => <Courses {...props} />}
                  exact
                />
                <PrivateRoute path={ROUTES.profiles}>
                  <ProfilesPage />
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
