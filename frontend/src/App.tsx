import React from 'react';
import tw from 'twin.macro';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Course, Home, Profiles } from './pages';

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path='/profiles'>
          <Profiles />
        </Route>
        {/* TODO: add dynamic path */}
        <Route path='/course'>
          <Course />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
