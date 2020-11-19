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
import CourseContext from './context/Course';
import HomeContext from './pages/Home/Home.context';
import Course from './pages/Course';

function App() {
  return (
    <div className="App">
      <Router>
        <Auth.Provider>
          <CourseContext.Provider>
            <Switch>
              <Route exact path="/">
                <Layout>
                  <HomeContext.Provider>
                    <Home />
                  </HomeContext.Provider>
                </Layout>
              </Route>
              <Route path="/course/:id">
                <Layout>
                  <Course />
                </Layout>
              </Route>
              <Route path="/sign-in">
                <SignIn />
              </Route>
              <Redirect to="/sign-in" />
            </Switch>
          </CourseContext.Provider>
        </Auth.Provider>
      </Router>
    </div>
  );
}

export default App;
