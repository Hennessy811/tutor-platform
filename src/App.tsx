import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import './App.scss';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Layout from './shared/components/Layout';
import Auth from './context/Auth';

function App() {
  return (
    <div className="App">
      <Router>
        <Auth.Provider>
          <Switch>
            <Route exact path="/">
              <Layout>
                <Home />
              </Layout>
            </Route>
            <Route path="/sign-in">
              <SignIn />
            </Route>
            <Redirect to="/sign-in" />
          </Switch>
        </Auth.Provider>
      </Router>
    </div>
  );
}

export default App;
