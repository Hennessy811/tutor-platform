import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.scss";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import { useAuth } from "./shared/utils/hooks/auth";
import { Auth } from "./store/auth/useAuth";

function App() {
  const { token } = useAuth();

  console.log(token);

  return (
    <div className="App">
      <Auth.Provider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/sign-in">
              <SignIn />
            </Route>
            <Redirect to="/sign-in" />
          </Switch>
        </Router>
      </Auth.Provider>
    </div>
  );
}

export default App;
