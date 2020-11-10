import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import styles from './App.module.scss';
import Home from './pages/Home';
import Layout from './shared/components/Layout';
import Config from './context/Config';

function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Config.Provider>
          <Switch>
            <Route exact path="/">
              <Layout>
                <Home />
              </Layout>
            </Route>
            <Route path="**">404</Route>
            <Redirect to="/sign-in" />
          </Switch>
        </Config.Provider>
      </Router>
    </div>
  );
}

export default App;
